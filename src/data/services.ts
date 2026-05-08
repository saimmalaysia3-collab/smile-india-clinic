import { Sparkles, Stethoscope, Smile, Crown, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceItem = { name: string; description: string };
export type ServiceCategory = {
  category: string;
  icon: LucideIcon;
  tagline: string;
  items: ServiceItem[];
};

export const services: ServiceCategory[] = [
  {
    category: "General & Preventive Care",
    icon: Stethoscope,
    tagline: "Healthy smiles start here",
    items: [
      { name: "Scaling & Polishing", description: "Professional teeth cleaning to remove plaque and tartar for fresh, healthy gums." },
      { name: "Dental Fillings", description: "Tooth-coloured fillings to restore cavities seamlessly and painlessly." },
      { name: "Oral Exam & X-rays", description: "Comprehensive checkups with digital X-rays for early problem detection." },
    ],
  },
  {
    category: "Restorative Treatments",
    icon: Wrench,
    tagline: "Bring back your natural bite",
    items: [
      { name: "Root Canal Treatment (RCT)", description: "Painless single-sitting RCT to save your natural tooth." },
      { name: "Crowns & Bridges (Caps)", description: "Durable ceramic & zirconia crowns crafted to match your smile." },
      { name: "Dentures", description: "Custom-fit removable & fixed dentures for full chewing comfort." },
    ],
  },
  {
    category: "Orthodontics",
    icon: Smile,
    tagline: "Straighten with confidence",
    items: [
      { name: "Braces", description: "Metal & ceramic braces for kids, teens and adults." },
      { name: "Invisalign / Aligners", description: "Nearly invisible clear aligners — straighten teeth discreetly." },
    ],
  },
  {
    category: "Cosmetic Dentistry",
    icon: Sparkles,
    tagline: "Designer smiles, made for you",
    items: [
      { name: "Teeth Whitening", description: "In-clinic & take-home whitening for a brighter shade in one visit." },
      { name: "Veneers", description: "Ultra-thin porcelain veneers for a flawless Bollywood-perfect smile." },
      { name: "Gum Contouring", description: "Reshape uneven gum lines for a balanced, confident smile." },
    ],
  },
  {
    category: "Surgical Procedures",
    icon: Crown,
    tagline: "Expert hands, gentle care",
    items: [
      { name: "Tooth Extraction", description: "Safe, painless removal — including wisdom teeth surgery." },
      { name: "Dental Implants", description: "Titanium implants that look, feel & function like natural teeth." },
    ],
  },
];