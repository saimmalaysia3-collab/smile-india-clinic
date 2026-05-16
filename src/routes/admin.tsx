import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ServicesManager } from '@/components/admin/ServicesManager'
import { AdminLogin } from '@/components/admin/AdminLogin'

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
})

function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage website content and realtime updates.
        </p>
      </div>

      <AdminLogin />

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Services</CardTitle></CardHeader>
          <CardContent>Manage clinic services.</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Appointments</CardTitle></CardHeader>
          <CardContent>Track appointment requests.</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>CMS</CardTitle></CardHeader>
          <CardContent>Edit website content live.</CardContent>
        </Card>
      </div>

      <ServicesManager />
    </div>
  )
}
