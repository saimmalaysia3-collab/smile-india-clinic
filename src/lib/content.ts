import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Stethoscope, Smile, Crown, Wrench, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles, Stethoscope, Smile, Crown, Wrench,
};
export function resolveIcon(name: string | null | undefined): LucideIcon {
  return (name && ICON_MAP[name]) || Stethoscope;
}

export type Testimonial = {
  id: string;
  name: string;
  city: string | null;
  treatment: string | null;
  quote: string;
  rating: number;
  image_key: string | null;
  sort_order: number;
  active: boolean;
};

export type ServiceRow = {
  id: string;
  category: string;
  tagline: string | null;
  summary: string | null;
  icon: string | null;
  image_key: string | null;
  doctor_name: string | null;
  sort_order: number;
  active: boolean;
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type GalleryImg = { src: string; alt: string; caption: string };

export type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  meta_title: string | null;
  meta_description: string | null;
  hero_image_key: string | null;
  lead: string | null;
  body: Block[];
  gallery: GalleryImg[];
  cta_service: string | null;
  sort_order: number;
  active: boolean;
};

export async function listTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as Testimonial[]) ?? [];
}

export async function listServices(): Promise<ServiceRow[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as ServiceRow[]) ?? [];
}

export async function listArticles(): Promise<ArticleRow[]> {
  const { data, error } = await supabase
    .from("service_articles")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as any[])?.map((r) => ({
    ...r,
    body: Array.isArray(r.body) ? r.body : [],
    gallery: Array.isArray(r.gallery) ? r.gallery : [],
  })) ?? [];
}

export async function getArticleBySlug(slug: string): Promise<ArticleRow | null> {
  const { data, error } = await supabase
    .from("service_articles")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    ...(data as any),
    body: Array.isArray((data as any).body) ? (data as any).body : [],
    gallery: Array.isArray((data as any).gallery) ? (data as any).gallery : [],
  };
}

export type ServiceWithItems = ServiceRow & {
  items: { slug: string; name: string; description: string }[];
};

export async function listServicesWithItems(): Promise<ServiceWithItems[]> {
  const [services, articles] = await Promise.all([listServices(), listArticles()]);
  return services.map((s) => ({
    ...s,
    items: articles
      .filter((a) => a.category === s.category)
      .map((a) => ({ slug: a.slug, name: a.title, description: a.lead?.slice(0, 140) ?? "" })),
  }));
}
