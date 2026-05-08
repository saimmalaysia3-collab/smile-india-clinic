import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Heart } from "lucide-react";

type OpenArgs = { service?: string; doctor?: string };
type Ctx = { open: (args?: OpenArgs) => void };

const BookingCtx = createContext<Ctx | null>(null);

export function useBooking() {
  const ctx = useContext(BookingCtx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [args, setArgs] = useState<OpenArgs>({});

  const open = useCallback((a?: OpenArgs) => {
    setArgs(a ?? {});
    setOpen(true);
  }, []);

  return (
    <BookingCtx.Provider value={{ open }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none">
          <div className="bg-card rounded-3xl border border-border shadow-warm overflow-hidden">
            <div className="bg-gradient-hero text-primary-foreground px-6 py-5 pattern-mandala">
              <DialogHeader>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-90">
                  <Heart className="w-3.5 h-3.5" /> Namaste · Welcome
                </div>
                <DialogTitle className="font-display text-2xl">Book an Appointment</DialogTitle>
                <DialogDescription className="text-primary-foreground/85">
                  Pick your specialist & slot — we'll send a unique reference ID instantly.
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="p-6">
              <AppointmentForm
                key={`${args.service ?? ""}-${args.doctor ?? ""}-${isOpen}`}
                defaultService={args.service}
                defaultDoctor={args.doctor}
                compact
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </BookingCtx.Provider>
  );
}