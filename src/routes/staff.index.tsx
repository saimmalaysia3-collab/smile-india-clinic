import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Stethoscope, Users, CalendarDays, Mail } from "lucide-react";

export const Route = createFileRoute("/staff/")({
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState({ doctors: 0, patients: 0, todayAppts: 0, newMsgs: 0 });

  useEffect(() => {
    (async () => {
      const start = new Date(); start.setHours(0,0,0,0);
      const end = new Date(start); end.setDate(end.getDate()+1);
      const [d, p, a, m] = await Promise.all([
        supabase.from("doctors").select("id", { count: "exact", head: true }).eq("active", true),
        supabase.from("patients").select("id", { count: "exact", head: true }),
        supabase.from("appointments").select("id", { count: "exact", head: true })
          .gte("scheduled_at", start.toISOString()).lt("scheduled_at", end.toISOString()),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status","new"),
      ]);
      setStats({ doctors: d.count ?? 0, patients: p.count ?? 0, todayAppts: a.count ?? 0, newMsgs: m.count ?? 0 });
    })();
  }, []);

  const cards = [
    { label: "Active Doctors", value: stats.doctors, icon: Stethoscope, to: "/staff/doctors", color: "bg-blue-500/10 text-blue-600" },
    { label: "Active Patients", value: stats.patients, icon: Users, to: "/staff/patients", color: "bg-emerald-500/10 text-emerald-600" },
    { label: "Today's Appointments", value: stats.todayAppts, icon: CalendarDays, to: "/staff/appointments", color: "bg-amber-500/10 text-amber-600" },
    { label: "New Messages", value: stats.newMsgs, icon: Mail, to: "/staff/messages", color: "bg-pink-500/10 text-pink-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of clinic activity</p>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.to as any} className="bg-card border border-border rounded-2xl p-5 shadow-soft hover:shadow-warm transition">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.color}`}>
              <c.icon className="w-5 h-5" />
            </div>
            <div className="mt-4 text-3xl font-bold">{c.value}</div>
            <div className="text-sm text-muted-foreground">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}