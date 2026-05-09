import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Clock, ShieldCheck, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import { BookButton } from "@/components/BookButton";
import implant1 from "@/assets/implant-1.jpg";
import implant2 from "@/assets/implant-2.jpg";
import implant3 from "@/assets/implant-3.jpg";
import implant4 from "@/assets/implant-4.jpg";

const PAGE_TITLE = "Dental Implants in India — Cost, Procedure & Recovery | Smile Dental";
const PAGE_DESC = "Premium titanium dental implants at Smile Dental Clinic. Painless single-sitting procedure, lifetime warranty, EMI options. Trusted by 5000+ Indian patients.";

export const Route = createFileRoute("/services_/dental-implants")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { name: "keywords", content: "dental implants India, tooth implant cost, single tooth implant, full mouth implants, titanium implant, basal implant, all-on-4" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:image", content: implant1 },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: implant1 },
      { rel: "canonical", href: "/services/dental-implants" },
    ],
  }),
  component: ImplantsArticle,
});

type GalleryImg = { src: string; caption: string; alt: string };

const gallery: GalleryImg[] = [
  { src: implant1, alt: "Titanium dental implant placement procedure", caption: "Step 1 — Painless titanium implant placement under local anaesthesia" },
  { src: implant2, alt: "Cross-section of dental implant with crown", caption: "Anatomy — Implant post, abutment and ceramic crown working as one natural tooth" },
  { src: implant4, alt: "Dentist reviewing dental X-ray for implant planning", caption: "Digital planning — 3D CBCT scan ensures precise, safe implant positioning" },
  { src: implant3, alt: "Happy patient smiling after dental implant treatment", caption: "Result — A confident, natural-looking smile that lasts a lifetime" },
];

function ImplantsArticle() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % gallery.length));

  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="mx-auto max-w-5xl px-6">
          <nav className="text-sm opacity-80 mb-4">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/services" className="hover:underline">Services</Link>
            <span className="mx-2">›</span>
            <span>Dental Implants</span>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-display font-bold leading-tight">
            Dental Implants — A Permanent Solution for Missing Teeth
          </h1>
          <p className="mt-4 text-lg opacity-90 max-w-3xl">
            Restore your smile, your bite and your confidence with India's most trusted titanium implant treatments — backed by 15+ years of experience and 5000+ happy patients.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> ISO Certified</span>
            <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur flex items-center gap-1.5"><Clock className="w-4 h-4" /> Single-sitting option</span>
            <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Lifetime warranty*</span>
          </div>
        </div>
      </section>

      <article className="py-14">
        <div className="mx-auto max-w-3xl px-6 prose-custom">
          <p className="text-lg text-muted-foreground leading-relaxed">
            A dental implant is a small, biocompatible titanium screw that replaces the root of a missing tooth. Once placed in the jawbone, it fuses naturally over a few months — a process called <em>osseointegration</em> — creating a rock-solid foundation for a crown, bridge or full-arch denture that looks, feels and functions exactly like your real teeth.
          </p>

          <h2 className="text-2xl font-display font-bold mt-10 mb-3 text-accent">Why choose implants over bridges or dentures?</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Lifetime durability — implants can last 25+ years with basic care.",
              "No grinding of healthy adjacent teeth (unlike traditional bridges).",
              "Prevents jawbone loss that follows tooth extraction.",
              "Eat anything — corn, chikki, sugarcane, even hard rotis without worry.",
              "No slipping or clicking like removable dentures.",
            ].map((p) => (
              <li key={p} className="flex gap-3"><Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{p}</span></li>
            ))}
          </ul>

          <h2 className="text-2xl font-display font-bold mt-10 mb-3 text-accent">The procedure — what to expect</h2>
          <ol className="space-y-3 text-muted-foreground list-decimal pl-5">
            <li><strong className="text-foreground">Consultation & 3D scan:</strong> Digital CBCT imaging maps your jawbone in millimetre detail.</li>
            <li><strong className="text-foreground">Implant placement:</strong> A 30–60 minute painless procedure under local anaesthesia.</li>
            <li><strong className="text-foreground">Healing (3–6 months):</strong> The implant fuses with your jawbone naturally.</li>
            <li><strong className="text-foreground">Crown fitting:</strong> A custom-matched zirconia crown is placed — your new tooth is ready.</li>
          </ol>
        </div>

        {/* Image Gallery */}
        <div className="mx-auto max-w-6xl px-6 mt-14">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-center text-accent">Inside Our Implant Clinic</h2>
          <p className="text-center text-muted-foreground mt-2">Tap any image to zoom in</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gallery.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightbox(i)}
                className="group text-left rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-warm transition-shadow"
                aria-label={`Open ${img.alt} in lightbox`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <figcaption className="p-3 text-sm text-muted-foreground leading-snug">{img.caption}</figcaption>
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 prose-custom mt-14">
          <h2 className="text-2xl font-display font-bold mb-3 text-accent">Cost of dental implants in India</h2>
          <p className="text-muted-foreground">
            Single implant treatment at Smile Dental starts from <strong className="text-foreground">₹22,000</strong> (including crown) and varies by implant brand (Nobel Biocare, Straumann, Osstem) and the complexity of your case. We offer <strong className="text-foreground">no-cost EMI</strong> up to 12 months and free first consultation for all patients.
          </p>

          <h2 className="text-2xl font-display font-bold mt-10 mb-3 text-accent">Aftercare — keep your implants for life</h2>
          <p className="text-muted-foreground">
            Brush twice daily, floss around the implant, avoid tobacco and visit us every 6 months for a professional cleaning. With these simple steps, your implant will serve you for decades.
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-6 mt-14">
          <div className="rounded-3xl bg-accent text-accent-foreground p-8 lg:p-10 text-center shadow-warm">
            <h3 className="text-2xl lg:text-3xl font-display font-bold">Ready for a permanent smile?</h3>
            <p className="mt-2 opacity-90">Book a free implant consultation with our oral surgeon today.</p>
            <BookButton
              service="Surgical Procedures"
              className="inline-block mt-5 px-6 py-3 rounded-full bg-gradient-warm text-primary-foreground font-semibold shadow-soft"
            >
              Book Free Implant Consultation
            </BookButton>
          </div>
        </div>
      </article>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[lightbox].src}
              alt={gallery[lightbox].alt}
              className="w-full max-h-[78vh] object-contain rounded-xl"
            />
            <figcaption className="mt-4 text-center text-white/90 text-sm sm:text-base">
              {gallery[lightbox].caption}
              <span className="block mt-1 text-xs text-white/60">{lightbox + 1} / {gallery.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}