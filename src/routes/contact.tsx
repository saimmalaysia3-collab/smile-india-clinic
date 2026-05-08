import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  CalendarIcon,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book Appointment & Contact — Smile Dental Clinic" },
      { name: "description", content: "Book a dental appointment online, get directions, or call us on WhatsApp. Smile Dental Clinic, MG Road, New Delhi." },
      { property: "og:title", content: "Book Appointment — Smile Dental Clinic" },
      { property: "og:description", content: "Online appointment booking, WhatsApp & call support. Visit us at MG Road, New Delhi." },
    ],
  }),
  component: ContactPage,
});

const PHONE = "+919999999999";
const PHONE_DISPLAY = "+91 99999 99999";
const WHATSAPP = "919999999999";
const ADDRESS = "12, MG Road, Connaught Place, New Delhi - 110001";
const TIME_SLOTS = [
  "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "04:00 PM", "04:30 PM", "05:00 PM",
  "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
];

const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email").max(200).optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  date: z.date({ required_error: "Please pick a date" }),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name required").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
  message: z.string().trim().min(5, "Please write your enquiry").max(1000),
});

function ContactPage() {
  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground py-14">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold">Get in Touch</h1>
          <p className="mt-3 opacity-90 max-w-2xl mx-auto">
            Book an appointment, ask a question, or just say namaste — we're always happy to help.
          </p>
        </div>
      </section>

      {/* Quick contact strip */}
      <section className="-mt-10">
        <div className="mx-auto max-w-6xl px-6 grid sm:grid-cols-3 gap-4">
          <a
            href={`tel:${PHONE}`}
            className="bg-card rounded-2xl shadow-warm border border-border p-5 flex items-center gap-3 hover:shadow-soft transition"
          >
            <span className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">Call us</div>
              <div className="font-semibold">{PHONE_DISPLAY}</div>
            </div>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Namaste! I'd like to book a dental appointment.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card rounded-2xl shadow-warm border border-border p-5 flex items-center gap-3 hover:shadow-soft transition"
          >
            <span className="w-11 h-11 rounded-full bg-secondary/15 text-secondary flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">WhatsApp</div>
              <div className="font-semibold">Chat with us instantly</div>
            </div>
          </a>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Connaught+Place+New+Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card rounded-2xl shadow-warm border border-border p-5 flex items-center gap-3 hover:shadow-soft transition"
          >
            <span className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">Visit clinic</div>
              <div className="font-semibold">Get directions</div>
            </div>
          </a>
        </div>
      </section>

      {/* Appointment booking */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold">Book an Appointment</h2>
            <p className="mt-2 text-muted-foreground">
              Pick a convenient slot — we'll confirm via WhatsApp within 15 minutes.
            </p>
            <AppointmentForm />
          </div>

          <aside className="lg:col-span-2 space-y-5">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
              <div className="flex items-center gap-2 font-semibold"><MapPin className="w-4 h-4 text-primary" /> Clinic Address</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{ADDRESS}</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
              <div className="flex items-center gap-2 font-semibold"><Clock className="w-4 h-4 text-primary" /> Working Hours</div>
              <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                <li className="flex justify-between"><span>Mon – Sat</span><span>9:00 AM – 9:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday</span><span>10:00 AM – 2:00 PM</span></li>
              </ul>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft space-y-2 text-sm">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> {PHONE_DISPLAY}</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> care@smiledental.in</div>
            </div>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl overflow-hidden shadow-warm border border-border">
            <iframe
              title="Smile Dental Clinic location"
              src="https://www.google.com/maps?q=Connaught+Place+New+Delhi&output=embed"
              width="100%"
              height="380"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="bg-card rounded-3xl border border-border p-8 shadow-soft">
            <h2 className="text-2xl font-bold">Send us an Enquiry</h2>
            <p className="mt-1 text-muted-foreground text-sm">
              Have a question about a treatment, cost or insurance? Drop us a message.
            </p>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}

function AppointmentForm() {
  const [submitted, setSubmitted] = useState<null | { name: string; date: Date; time: string }>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (submitted) {
    return (
      <div className="mt-6 bg-card border border-border rounded-3xl p-8 text-center shadow-warm">
        <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="mt-4 text-2xl font-bold">Dhanyavaad, {submitted.name}!</h3>
        <p className="mt-2 text-muted-foreground">
          Your appointment request for{" "}
          <span className="font-semibold text-foreground">{format(submitted.date, "EEEE, do MMM yyyy")}</span>{" "}
          at <span className="font-semibold text-foreground">{submitted.time}</span> has been received.
          Our team will confirm via WhatsApp shortly.
        </p>
        <Button className="mt-5" onClick={() => { setSubmitted(null); setDate(undefined); setTime(""); setService(""); }}>
          Book another appointment
        </Button>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      service,
      date: date as Date,
      time,
      notes: String(fd.get("notes") ?? ""),
    };
    const result = appointmentSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((iss) => {
        const k = iss.path[0]?.toString() ?? "";
        if (k && !fieldErrors[k]) fieldErrors[k] = iss.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    toast.success("Appointment requested!");
    setSubmitted({ name: result.data.name, date: result.data.date, time: result.data.time });
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 bg-card border border-border rounded-3xl p-6 shadow-soft space-y-4">
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

      <Field label="Treatment / Service" error={errors.service}>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
          <SelectContent>
            {services.flatMap((cat) =>
              cat.items.map((it) => (
                <SelectItem key={it.name} value={it.name}>
                  {it.name}
                </SelectItem>
              ))
            )}
            <SelectItem value="General Consultation">General Consultation</SelectItem>
          </SelectContent>
        </Select>
      </Field>

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
                onSelect={setDate}
                disabled={(d) => {
                  const today = new Date(); today.setHours(0, 0, 0, 0);
                  const max = new Date(); max.setDate(max.getDate() + 60);
                  return d < today || d > max;
                }}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Field label="Preferred Time" error={errors.time}>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger><SelectValue placeholder="Choose a slot" /></SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
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

function EnquiryForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const result = enquirySchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((iss) => {
        const k = iss.path[0]?.toString() ?? "";
        if (k && !fieldErrors[k]) fieldErrors[k] = iss.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSent(true);
    toast.success("Enquiry sent! We'll reply within 24 hours.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Your Name" error={errors.name}>
          <Input name="name" maxLength={80} placeholder="Full name" />
        </Field>
        <Field label="Email" error={errors.email}>
          <Input name="email" type="email" maxLength={200} placeholder="you@example.com" />
        </Field>
      </div>
      <Field label="Message" error={errors.message}>
        <Textarea name="message" rows={4} maxLength={1000} placeholder="Type your question here…" />
      </Field>
      <Button type="submit" className="rounded-full px-6">Send Enquiry</Button>
      {sent && <p className="text-sm text-primary">Thank you! Your message has been received.</p>}
    </form>
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
