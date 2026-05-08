import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { cn } from "@/lib/utils";
import {
  TIME_SLOTS,
  getBookedTimesForDate,
  isDateFullyBooked,
  isSlotTaken,
  saveBooking,
  getDoctorForService,
  type Booking,
} from "@/lib/booking-store";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email").max(200).optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  doctor: z.string().min(1, "Please select a doctor"),
  date: z.date({ required_error: "Please pick a date" }),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export type AppointmentFormProps = {
  defaultService?: string;
  defaultDoctor?: string;
  onSuccess?: (booking: Booking) => void;
  compact?: boolean;
};

export function AppointmentForm({ defaultService, defaultDoctor, onSuccess, compact }: AppointmentFormProps) {
  const [submitted, setSubmitted] = useState<Booking | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [service, setService] = useState<string>(defaultService ?? "");
  const [doctor, setDoctor] = useState<string>(
    defaultDoctor ?? (defaultService ? getDoctorForService(defaultService) ?? "" : "")
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-select doctor when service changes
  useEffect(() => {
    if (!service) return;
    const auto = getDoctorForService(service);
    if (auto) setDoctor(auto);
  }, [service]);

  const bookedTimes = useMemo(() => (date ? getBookedTimesForDate(date) : []), [date, submitted]);

  if (submitted) {
    return <SuccessPanel booking={submitted} onReset={() => {
      setSubmitted(null);
      setDate(undefined);
      setTime("");
      setService(defaultService ?? "");
      setDoctor(defaultDoctor ?? "");
    }} />;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      service,
      doctor,
      date: date as Date,
      time,
      notes: String(fd.get("notes") ?? ""),
    };
    const result = schema.safeParse(raw);
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.issues.forEach((iss) => {
        const k = iss.path[0]?.toString() ?? "";
        if (k && !fe[k]) fe[k] = iss.message;
      });
      setErrors(fe);
      toast.error("Please fix the highlighted fields");
      return;
    }
    const { taken, duplicate } = isSlotTaken(result.data.date, result.data.time, result.data.phone);
    if (taken) {
      setErrors({ time: "This slot is already booked. Please choose another." });
      toast.error("Slot already booked");
      return;
    }
    if (duplicate) {
      setErrors({ phone: "You already have a booking on this date with this number." });
      toast.error("Duplicate booking detected");
      return;
    }
    const booking = saveBooking({
      name: result.data.name,
      phone: result.data.phone,
      email: result.data.email || undefined,
      service: result.data.service,
      doctor: result.data.doctor,
      date: result.data.date,
      time: result.data.time,
      notes: result.data.notes || undefined,
    });
    setErrors({});
    toast.success(`Appointment confirmed · ${booking.ref}`);
    setSubmitted(booking);
    onSuccess?.(booking);
  };

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", !compact && "mt-6 bg-card border border-border rounded-3xl p-6 shadow-soft")}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" error={errors.name}>
          <Input name="name" placeholder="e.g. Riya Sharma" maxLength={80} />
        </Field>
        <Field label="Mobile Number" error={errors.phone}>
          <Input name="phone" inputMode="numeric" placeholder="10-digit mobile" maxLength={10} />
        </Field>
      </div>

      <Field label="Email (optional)" error={errors.email}>
        <Input name="email" type="email" placeholder="you@example.com" maxLength={200} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Treatment / Service" error={errors.service}>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="General Consultation">General Consultation</SelectItem>
              {services.flatMap((cat) => [
                <div key={cat.category} className="px-2 pt-2 pb-1 text-[11px] uppercase tracking-wider text-muted-foreground">{cat.category}</div>,
                ...cat.items.map((it) => (
                  <SelectItem key={it.name} value={it.name}>{it.name}</SelectItem>
                )),
              ])}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Specialist Doctor" error={errors.doctor}>
          <Select value={doctor} onValueChange={setDoctor}>
            <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
            <SelectContent>
              {doctors.map((d) => (
                <SelectItem key={d.name} value={d.name}>{d.name} — {d.role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Preferred Date" error={errors.date}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => { setDate(d); setTime(""); }}
                disabled={(d) => {
                  const today = new Date(); today.setHours(0, 0, 0, 0);
                  const max = new Date(); max.setDate(max.getDate() + 60);
                  if (d < today || d > max) return true;
                  return isDateFullyBooked(d);
                }}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Field label="Preferred Time" error={errors.time}>
          <Select value={time} onValueChange={setTime} disabled={!date}>
            <SelectTrigger><SelectValue placeholder={date ? "Choose a slot" : "Pick a date first"} /></SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => {
                const taken = bookedTimes.includes(t);
                return (
                  <SelectItem key={t} value={t} disabled={taken}>
                    {t} {taken && <span className="text-xs text-muted-foreground ml-2">· booked</span>}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Notes (optional)" error={errors.notes}>
        <Textarea name="notes" rows={3} maxLength={500} placeholder="Tell us about your concern, pain level, or any medical history…" />
      </Field>

      <Button type="submit" className="w-full bg-gradient-warm text-primary-foreground font-semibold py-6 rounded-full">
        Request Appointment
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to be contacted on the number provided.
      </p>
    </form>
  );
}

function SuccessPanel({ booking, onReset }: { booking: Booking; onReset: () => void }) {
  const copy = () => {
    navigator.clipboard?.writeText(booking.ref);
    toast.success("Reference ID copied");
  };
  return (
    <div className="bg-card border border-border rounded-3xl p-8 text-center shadow-warm">
      <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
        <CheckCircle2 className="w-7 h-7" />
      </div>
      <h3 className="mt-4 text-2xl font-bold">Dhanyavaad, {booking.name}!</h3>
      <p className="mt-2 text-muted-foreground">
        Your appointment for{" "}
        <span className="font-semibold text-foreground">{format(new Date(booking.date), "EEEE, do MMM yyyy")}</span>{" "}
        at <span className="font-semibold text-foreground">{booking.time}</span> with{" "}
        <span className="font-semibold text-foreground">{booking.doctor}</span> is confirmed.
      </p>
      <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 px-5 py-3">
        <div className="text-left">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Reference ID</div>
          <div className="font-mono font-bold text-lg text-primary">{booking.ref}</div>
        </div>
        <button type="button" onClick={copy} className="p-2 rounded-lg hover:bg-primary/10 text-primary" aria-label="Copy reference ID">
          <Copy className="w-4 h-4" />
        </button>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Save this ID — our team will reference it when confirming via WhatsApp.</p>
      <Button className="mt-5" onClick={onReset}>Book another appointment</Button>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}