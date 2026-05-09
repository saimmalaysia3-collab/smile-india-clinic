import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { services } from "@/data/services";
import { Check } from "lucide-react";
import { BookButton } from "@/components/BookButton";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Dental Services — Smile Dental Clinic" },
      { name: "description", content: "Complete dental services: cleaning, RCT, implants, braces, Invisalign, veneers, whitening, dentures and more." },
      { property: "og:title", content: "Our Dental Services — Smile Dental Clinic" },
      { property: "og:description", content: "Complete dental care under one roof — preventive, restorative, cosmetic, ortho & surgical." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold">Our Services</h1>
          <p className="mt-3 opacity-90 max-w-2xl mx-auto">Every treatment your family needs — delivered with precision, comfort and care.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 space-y-20">
          {services.map((cat, idx) => {
            const Icon = cat.icon;
            const reverse = idx % 2 === 1;
            return (
              <article
                key={cat.category}
                id={cat.category.toLowerCase().replace(/\s+/g, "-")}
                className="grid lg:grid-cols-2 gap-10 items-center"
              >
                <div className={`overflow-hidden rounded-3xl shadow-warm ${reverse ? "lg:order-2" : ""}`}>
                  <img
                    src={cat.image}
                    alt={`${cat.category} at Smile Dental Clinic`}
                    width={768}
                    height={512}
                    loading="lazy"
                    className="w-full h-72 lg:h-80 object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-warm flex items-center justify-center text-primary-foreground shadow-soft">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-primary font-medium">{cat.tagline}</span>
                  </div>
                  <h2 className="mt-4 text-3xl font-bold">{cat.category}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{cat.summary}</p>
                  <div className="mt-5 grid sm:grid-cols-1 gap-3">
                    {cat.items.map((it) => (
                      <div key={it.name} className="bg-card border border-border rounded-2xl p-4 shadow-soft">
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4" />
                          </span>
                          <div>
                            <Link
                              to="/services/$slug"
                              params={{ slug: it.slug }}
                              className="font-semibold hover:text-primary transition-colors"
                            >
                              {it.name}
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">{it.description}</p>
                            <Link
                              to="/services/$slug"
                              params={{ slug: it.slug }}
                              className="inline-block mt-2 text-xs font-semibold text-primary hover:underline"
                            >
                              Read full guide →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <BookButton
                    service={cat.category}
                    className="inline-block mt-6 px-5 py-2.5 rounded-full bg-gradient-warm text-primary-foreground font-semibold shadow-soft"
                  >
                    Book {cat.category.split(" ")[0]} Consultation
                  </BookButton>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl bg-accent text-accent-foreground p-10 text-center shadow-warm">
            <h3 className="text-2xl font-bold">Not sure which treatment you need?</h3>
            <p className="mt-2 opacity-90">Get a free consultation with our specialists.</p>
            <BookButton className="inline-block mt-5 px-6 py-3 rounded-full bg-gradient-warm text-primary-foreground font-semibold">
              Book Free Consultation
            </BookButton>
          </div>
        </div>
      </section>
    </>
  );
}
