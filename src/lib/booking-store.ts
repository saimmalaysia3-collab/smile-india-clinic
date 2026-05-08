import { format } from "date-fns";
import { services } from "@/data/services";

const KEY = "smile-dental-bookings-v1";

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

function read(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(list: Booking[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("smile-bookings-updated"));
}

export function getBookings(): Booking[] {
  return read();
}

export function getBookedTimesForDate(date: Date): string[] {
  const key = format(date, "yyyy-MM-dd");
  return read().filter((b) => b.date === key).map((b) => b.time);
}

export function isDateFullyBooked(date: Date): boolean {
  return getBookedTimesForDate(date).length >= TIME_SLOTS.length;
}

export function isSlotTaken(date: Date, time: string, phone?: string): { taken: boolean; duplicate: boolean } {
  const key = format(date, "yyyy-MM-dd");
  const list = read();
  const taken = list.some((b) => b.date === key && b.time === time);
  const duplicate = phone
    ? list.some((b) => b.date === key && b.phone === phone)
    : false;
  return { taken, duplicate };
}

export function generateRef(date: Date): string {
  const ymd = format(date, "yyyyMMdd");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SDC-${ymd}-${rand}`;
}

export function saveBooking(b: Omit<Booking, "ref" | "createdAt"> & { date: Date | string }): Booking {
  const dateStr = typeof b.date === "string" ? b.date : format(b.date, "yyyy-MM-dd");
  const dateObj = typeof b.date === "string" ? new Date(b.date) : b.date;
  const booking: Booking = {
    ...b,
    date: dateStr,
    ref: generateRef(dateObj),
    createdAt: new Date().toISOString(),
  };
  const list = read();
  list.push(booking);
  write(list);
  return booking;
}

export function getDoctorForService(serviceName: string): string | undefined {
  if (!serviceName) return undefined;
  // Treat well-known generic options
  if (/general consultation/i.test(serviceName)) return "Dr. Arjun Sharma";
  for (const cat of services) {
    if (cat.category === serviceName) return cat.doctorName;
    if (cat.items.some((i) => i.name === serviceName)) return cat.doctorName;
  }
  return undefined;
}