import { format } from "date-fns";
import { services } from "@/data/services";
import { supabase } from "@/integrations/supabase/client";

export type Booking = {
  ref: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  doctor?: string;
  date: string; // yyyy-MM-dd
  time: string;
  notes?: string;
  createdAt: string;
};

export const TIME_SLOTS = [
  "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "04:00 PM", "04:30 PM", "05:00 PM",
  "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
];

function parseSlotToDate(dateStr: string, time: string): Date {
  // time format "hh:mm AM/PM"
  const [t, mer] = time.split(" ");
  const [hhStr, mmStr] = t.split(":");
  let hh = parseInt(hhStr, 10);
  const mm = parseInt(mmStr, 10);
  if (mer === "PM" && hh < 12) hh += 12;
  if (mer === "AM" && hh === 12) hh = 0;
  const d = new Date(`${dateStr}T00:00:00`);
  d.setHours(hh, mm, 0, 0);
  return d;
}

function formatTimeFromDate(d: Date): string {
  let hh = d.getHours();
  const mm = d.getMinutes();
  const mer = hh >= 12 ? "PM" : "AM";
  hh = hh % 12;
  if (hh === 0) hh = 12;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")} ${mer}`;
}

// In-memory cache of booked slots by date key for sync checks
const bookedCache = new Map<string, Set<string>>();

export async function refreshBookedForDate(date: Date): Promise<string[]> {
  const key = format(date, "yyyy-MM-dd");
  const from = new Date(`${key}T00:00:00`);
  const to = new Date(from);
  to.setDate(to.getDate() + 1);
  const { data, error } = await supabase.rpc("get_booked_slots", {
    _from: from.toISOString(),
    _to: to.toISOString(),
  });
  if (error) {
    bookedCache.set(key, new Set());
    return [];
  }
  const times = ((data ?? []) as Array<{ scheduled_at: string }>).map((r) =>
    formatTimeFromDate(new Date(r.scheduled_at))
  );
  bookedCache.set(key, new Set(times));
  return times;
}

export function getBookedTimesForDate(date: Date): string[] {
  const key = format(date, "yyyy-MM-dd");
  return Array.from(bookedCache.get(key) ?? []);
}

export function isDateFullyBooked(date: Date): boolean {
  return getBookedTimesForDate(date).length >= TIME_SLOTS.length;
}

export function isSlotTaken(date: Date, time: string): { taken: boolean; duplicate: boolean } {
  const key = format(date, "yyyy-MM-dd");
  const taken = (bookedCache.get(key) ?? new Set()).has(time);
  return { taken, duplicate: false };
}

export function generateRef(date: Date): string {
  const ymd = format(date, "yyyyMMdd");
  const bytes = new Uint8Array(3);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  const rand = Array.from(bytes).map((b) => b.toString(36).padStart(2, "0")).join("").slice(0, 6).toUpperCase();
  return `SDC-${ymd}-${rand}`;
}

export async function saveBooking(
  b: Omit<Booking, "ref" | "createdAt" | "date"> & { date: Date | string }
): Promise<Booking> {
  const dateStr = typeof b.date === "string" ? b.date : format(b.date, "yyyy-MM-dd");
  const dateObj = typeof b.date === "string" ? new Date(b.date) : b.date;
  const scheduledAt = parseSlotToDate(dateStr, b.time);
  const ref = generateRef(dateObj);

  const { error } = await supabase.from("appointments").insert({
    reference_id: ref,
    patient_name: b.name,
    patient_phone: b.phone,
    patient_email: b.email || null,
    service: b.service,
    doctor_name: b.doctor || null,
    scheduled_at: scheduledAt.toISOString(),
    notes: b.notes || null,
    status: "pending",
  });
  if (error) throw new Error(error.message);

  // Update cache
  const cacheKey = dateStr;
  const set = bookedCache.get(cacheKey) ?? new Set<string>();
  set.add(b.time);
  bookedCache.set(cacheKey, set);

  return {
    ref,
    name: b.name,
    phone: b.phone,
    email: b.email,
    service: b.service,
    doctor: b.doctor,
    date: dateStr,
    time: b.time,
    notes: b.notes,
    createdAt: new Date().toISOString(),
  };
}

export function getDoctorForService(serviceName: string): string | undefined {
  if (!serviceName) return undefined;
  if (/general consultation/i.test(serviceName)) return "Dr. Arjun Sharma";
  for (const cat of services) {
    if (cat.category === serviceName) return cat.doctorName;
    if (cat.items.some((i) => i.name === serviceName)) return cat.doctorName;
  }
  return undefined;
}
