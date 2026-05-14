import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";

export const Route = createFileRoute("/staff/appointments")({ component: Page });

type Appt = {
  id: string; reference_id: string; patient_name: string; patient_phone: string; patient_email: string | null;
  doctor_name: string | null; service: string; scheduled_at: string; status: string; notes: string | null;
};

function Page() {
  const [list, setList] = useState<Appt[]>([]);
  const [filter, setFilter] = useState<string>("all");

  async function load() {
    let q = supabase.from("appointments").select("*").order("scheduled_at", { ascending: false }).limit(200);
    if (filter !== "all") q = q.eq("status", filter as any);
    const { data, error } = await q;
    if (error) toast.error(error.message); else setList((data ?? []) as Appt[]);
  }
  useEffect(() => { load(); }, [filter]);

  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("appointments").update({ status: status as any }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Marked ${status}`);
    load();
  }
  async function del(id: string) {
    if (!confirm("Delete this appointment?")) return;
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); load();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-sm text-muted-foreground">View, approve and manage bookings</p>
        </div>
        <div className="flex gap-2">
          {["all","pending","approved","completed","cancelled"].map((s) => (
            <Button key={s} size="sm" variant={filter===s?"default":"outline"} onClick={()=>setFilter(s)}>{s}</Button>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-3">Ref</th><th className="px-4 py-3">Patient</th><th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Doctor</th><th className="px-4 py-3">When</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs">{a.reference_id}</td>
                  <td className="px-4 py-3"><div className="font-medium">{a.patient_name}</div><div className="text-xs text-muted-foreground">{a.patient_phone}</div></td>
                  <td className="px-4 py-3">{a.service}</td>
                  <td className="px-4 py-3">{a.doctor_name ?? "—"}</td>
                  <td className="px-4 py-3">{format(new Date(a.scheduled_at),"dd MMM yyyy · hh:mm a")}</td>
                  <td className="px-4 py-3"><Badge variant={a.status==="approved"?"default":"secondary"}>{a.status}</Badge></td>
                  <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                    {a.status==="pending" && <Button size="sm" onClick={()=>setStatus(a.id,"approved")}>Approve</Button>}
                    {a.status!=="completed" && <Button size="sm" variant="outline" onClick={()=>setStatus(a.id,"completed")}>Done</Button>}
                    <Button size="sm" variant="ghost" onClick={()=>del(a.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
              {list.length===0 && <tr><td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">No appointments yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}