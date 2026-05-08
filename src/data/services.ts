import { Sparkles, Stethoscope, Smile, Crown, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import svcGeneral from "@/assets/svc-general.jpg";
import svcRestorative from "@/assets/svc-restorative.jpg";
import svcOrtho from "@/assets/svc-ortho.jpg";
import svcCosmetic from "@/assets/svc-cosmetic.jpg";
import svcSurgical from "@/assets/svc-surgical.jpg";

export type ServiceItem = { name: string; description: string };
export type ServiceCategory = {
  category: string;
  icon: LucideIcon;
  tagline: string;
  image: string;
  summary: string;
  items: ServiceItem[];
};

export const services: ServiceCategory[] = [
  {
    category: "General & Preventive Care",
    icon: Stethoscope,
    tagline: "Healthy smiles start here",
    image: svcGeneral,
    summary:
      "Routine check-ups, professional cleanings and digital X-rays form the foundation of lifelong oral health. We catch cavities, gum issues and decay early — long before they become painful or expensive. Ideal for the whole family, every six months.",
    items: [
      { name: "Scaling & Polishing", description: "Ultrasonic teeth cleaning to remove plaque, tartar and stains for fresh breath and pink, healthy gums." },
      { name: "Dental Fillings", description: "Tooth-coloured composite fillings restore cavities seamlessly and painlessly in a single visit." },
      { name: "Oral Exam & X-rays", description: "Full-mouth checkup with low-radiation digital X-rays for accurate, early problem detection." },
    ],
  },
  {
    category: "Restorative Treatments",
    icon: Wrench,
    tagline: "Bring back your natural bite",
    image: svcRestorative,
    summary:
      "Damaged, decayed or missing teeth are rebuilt using painless, modern techniques. From single-sitting root canals to ceramic crowns and lifelike dentures, we restore both function and appearance. Eat, smile and speak with full confidence again.",
    items: [
      { name: "Root Canal Treatment (RCT)", description: "Painless single-sitting RCT with rotary endodontics to save your natural tooth from extraction." },
      { name: "Crowns & Bridges (Caps)", description: "Durable zirconia and E-max ceramic crowns crafted in-house to perfectly match your smile." },
      { name: "Dentures", description: "Custom-fit removable, fixed and implant-supported dentures for total chewing comfort." },
    ],
  },
  {
    category: "Orthodontics",
    icon: Smile,
    tagline: "Straighten with confidence",
    image: svcOrtho,
    summary:
      "Crooked, gapped or crowded teeth are gently guided into perfect alignment. We offer everything from traditional metal braces to nearly invisible clear aligners for kids, teens and working adults. Most cases finish in 12–18 months.",
    items: [
      { name: "Braces", description: "Metal, ceramic and self-ligating braces for kids, teens and adults at affordable EMI." },
      { name: "Invisalign / Aligners", description: "Nearly invisible clear aligners — straighten teeth discreetly without anyone noticing." },
    ],
  },
  {
    category: "Cosmetic Dentistry",
    icon: Sparkles,
    tagline: "Designer smiles, made for you",
    image: svcCosmetic,
    summary:
      "Transform your smile for that wedding, interview or special moment. Our smile makeovers combine whitening, veneers and gum reshaping to deliver a balanced, photo-ready look. Results you can see — and feel — in just one or two visits.",
    items: [
      { name: "Teeth Whitening", description: "In-clinic laser whitening and take-home kits for a brighter shade in under one hour." },
      { name: "Veneers", description: "Ultra-thin porcelain veneers for a flawless, Bollywood-perfect smile." },
      { name: "Gum Contouring", description: "Painless laser reshaping of uneven gum lines for a balanced, confident smile." },
    ],
  },
  {
    category: "Surgical Procedures",
    icon: Crown,
    tagline: "Expert hands, gentle care",
    image: svcSurgical,
    summary:
      "From simple extractions to advanced implant placement, our oral surgeons use sterile, minimally-invasive techniques. Most procedures are completed under local anaesthesia with same-day recovery. Sedation options are available for anxious patients.",
    items: [
      { name: "Tooth Extraction", description: "Safe, painless removal — including impacted wisdom teeth surgery under local anaesthesia." },
      { name: "Dental Implants", description: "Premium titanium implants that look, feel and function exactly like natural teeth." },
    ],
  },
];
