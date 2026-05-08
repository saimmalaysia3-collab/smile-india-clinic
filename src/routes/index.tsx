import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-clinic.jpg";
import { services } from "@/data/services";
import { doctors, testimonials } from "@/data/doctors";
import { Star, ShieldCheck, Award, Heart, Clock, Phone, Eye } from "lucide-react";
import { BookButton } from "@/components/BookButton";
import { DoctorProfileDialog } from "@/components/DoctorProfileDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smile Dental Clinic — Trusted Family Dentist in India" },
      { name: "description", content: "Modern dental care with Indian warmth. Painless RCT, implants, braces, smile makeovers & more. Book your appointment today." },
      { property: "og:title", content: "Smile Dental Clinic — Trusted Family Dentist in India" },
      { property: "og:description", content: "Modern dental care with Indian warmth. Painless RCT, implants, braces, smile makeovers & more." },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeDoctor, setActiveDoctor] = useState<(typeof doctors)[number] | null>(null);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pattern-mandala">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5" /> Namaste · Welcome
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Aapki <span className="text-gradient">muskaan</span>,<br/>hamari zimmedari.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              India's trusted family dental clinic — where world-class technology meets warm Indian hospitality. Painless treatments. Honest prices. Lifelong smiles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton className="px-6 py-3 rounded-full bg-gradient-warm text-primary-foreground font-semibold shadow-warm hover:opacity-90">
                Book Free Consultation
              </BookButton>
              <Link to="/services" className="px-6 py-3 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-accent-foreground transition">Explore Services</Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { n: "15+", l: "Years Experience" },
                { n: "20K+", l: "Happy Smiles" },
                { n: "4.9★", l: "Google Rating" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-bold text-accent font-display">{s.n}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-hero rounded-3xl blur-2xl opacity-30" />
            <img src={heroImg} alt="Smile Dental Clinic" width={1536} height={1024} className="relative rounded-3xl shadow-warm w-full object-cover aspect-[4/3]" />
            <div className="absolute -bottom-5 -left-5 bg-card rounded-2xl shadow-soft px-5 py-3 flex items-center gap-3 border border-border">
              <ShieldCheck className="w-8 h-8 text-secondary" />
              <div>
                <div className="text-xs text-muted-foreground">Sterilized & Safe</div>
                <div className="text-sm font-semibold">ISO Certified Clinic</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-6 py-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          {[
            { i: Award, t: "Award-winning Doctors" },
            { i: ShieldCheck, t: "100% Sterile Equipment" },
            { i: Clock, t: "Open All Days · 9AM–9PM" },
            { i: Phone, t: "EMI & Insurance Accepted" },
          ].map(({ i: Icon, t }) => (
            <div key={t} className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-primary-glow" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-20 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Services</span>
            <h2 className="mt-3 text-4xl font-bold">Complete dental care under one roof</h2>
            <p className="mt-4 text-muted-foreground">From routine cleanings to advanced implants — we offer every treatment your family needs.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.category} className="bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-warm hover:-translate-y-1 transition">
                  <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center text-primary-foreground">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{cat.category}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{cat.tagline}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {cat.items.map((it) => (
                      <li key={it.name} className="flex gap-2"><span className="text-primary">✦</span>{it.name}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="inline-block px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90">View All Services</Link>
          </div>
        </div>
      </section>

      {/* DOCTORS PREVIEW */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Meet Our Doctors</span>
            <h2 className="mt-3 text-4xl font-bold">Experienced. Caring. Trusted.</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {doctors.map((d) => (
              <button
                key={d.name}
                type="button"
                onClick={() => setActiveDoctor(d)}
                className="group text-left"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-soft">
                  <img src={d.image} alt={d.name} loading="lazy" width={768} height={768} className="w-full aspect-square object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-accent/95 to-transparent p-5 text-accent-foreground">
                    <div className="font-display text-xl font-bold">{d.name}</div>
                    <div className="text-xs opacity-90">{d.role}</div>
                  </div>
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-semibold bg-card/90 text-foreground px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                    <Eye className="w-3.5 h-3.5" /> View profile
                  </span>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">{d.qualifications} · {d.experience}</div>
              </button>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/doctors" className="inline-block px-6 py-3 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-accent-foreground transition">Meet The Full Team</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-soft pattern-mandala">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Patient Stories</span>
            <h2 className="mt-3 text-4xl font-bold">Smiles we've crafted</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card rounded-2xl overflow-hidden border border-border shadow-soft">
                <img src={t.image} alt={t.name} loading="lazy" width={768} height={768} className="w-full aspect-[4/3] object-cover" />
                <div className="p-5">
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="mt-3 text-sm italic text-muted-foreground">"{t.quote}"</p>
                  <div className="mt-4">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.city} · {t.treatment}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-warm aspect-video bg-accent">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/Ke90Tje7VS0?rel=0" title="Patient Testimonial Video" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-gradient-hero text-primary-foreground p-10 lg:p-14 text-center shadow-warm">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready for your dream smile?</h2>
            <p className="mt-3 opacity-90">Free consultation · No hidden charges · EMI options available</p>
            <BookButton className="inline-block mt-6 px-8 py-3 rounded-full bg-card text-accent font-bold hover:scale-105 transition">
              Book Appointment
            </BookButton>
          </div>
        </div>
      </section>

      <DoctorProfileDialog doctor={activeDoctor} open={!!activeDoctor} onOpenChange={(v) => !v && setActiveDoctor(null)} />
    </>
  );
}
