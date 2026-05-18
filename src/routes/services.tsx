import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { listServicesWithItems } from "@/lib/content";
import { resolveImage } from "@/lib/image-registry";

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
  const { data: services = [] } = useQuery({
    queryKey: ["services-with-items"],
    queryFn: listServicesWithItems,
  });

  return (
    <>
      <section className="bg-[hsl(36_40%_97%)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-[11px] tracking-[0.2em] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              OUR SERVICES
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-accent leading-tight">
              Complete dental care under one roof
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From routine check-ups to advanced surgical and cosmetic treatments — every smile,
              every age, every need, handled with precision and warmth.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((cat) => (
              <article
                key={cat.id}
                id={cat.category.toLowerCase().replace(/\s+/g, "-")}
                className="group bg-card rounded-3xl border border-border shadow-soft overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm"
              >
                <div className="overflow-hidden h-52">
                  <img
                    src={resolveImage(cat.image_key)}
                    alt={`${cat.category} at Smile Dental Clinic`}
                    width={600}
                    height={400}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] tracking-[0.18em] font-semibold text-primary uppercase">
                    Category: {cat.category}
                  </span>
                  <h2 className="mt-2 text-xl font-bold text-accent leading-snug">
                    {cat.tagline}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {cat.summary}
                  </p>

                  <div className="mt-5">
                    <div className="text-[10px] tracking-[0.18em] font-semibold text-muted-foreground uppercase mb-2">
                      Core Treatments
                    </div>
                    <ul className="space-y-1.5">
                      {cat.items.slice(0, 4).map((it) => (
                        <li key={it.slug} className="flex items-start gap-2 text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 rotate-45 bg-primary flex-shrink-0" />
                          <Link
                            to="/services/$slug"
                            params={{ slug: it.slug }}
                            className="text-foreground/85 hover:text-primary transition-colors"
                          >
                            {it.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/services/$slug"
                    params={{ slug: cat.items[0]?.slug ?? "" }}
                    className="mt-6 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Explore Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 bg-[hsl(36_40%_97%)]">
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
