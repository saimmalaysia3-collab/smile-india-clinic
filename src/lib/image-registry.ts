import svcGeneral from "@/assets/svc-general.jpg";
import svcRestorative from "@/assets/svc-restorative.jpg";
import svcOrtho from "@/assets/svc-ortho.jpg";
import svcCosmetic from "@/assets/svc-cosmetic.jpg";
import svcSurgical from "@/assets/svc-surgical.jpg";
import implant1 from "@/assets/implant-1.jpg";
import implant2 from "@/assets/implant-2.jpg";
import implant3 from "@/assets/implant-3.jpg";
import implant4 from "@/assets/implant-4.jpg";
import patient1 from "@/assets/patient-1.jpg";
import patient2 from "@/assets/patient-2.jpg";
import patient3 from "@/assets/patient-3.jpg";
import patient4 from "@/assets/patient-4.jpg";

// Map content-image keys (stored in DB) → bundled asset URLs.
// Falls back to a transparent placeholder if a key is missing or null.
const PLACEHOLDER =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3Crect width='4' height='3' fill='%23f1f1f1'/%3E%3C/svg%3E";

const REGISTRY: Record<string, string> = {
  "svc-general": svcGeneral,
  "svc-restorative": svcRestorative,
  "svc-ortho": svcOrtho,
  "svc-cosmetic": svcCosmetic,
  "svc-surgical": svcSurgical,
  "implant-1": implant1,
  "implant-2": implant2,
  "implant-3": implant3,
  "implant-4": implant4,
  "patient-1": patient1,
  "patient-2": patient2,
  "patient-3": patient3,
  "patient-4": patient4,
};

export function resolveImage(key: string | null | undefined): string {
  if (!key) return PLACEHOLDER;
  // Allow raw URLs to pass through (so staff can later paste a hosted URL).
  if (/^(https?:|data:|\/)/.test(key)) return key;
  return REGISTRY[key] ?? PLACEHOLDER;
}

export const IMAGE_KEYS = Object.keys(REGISTRY);
