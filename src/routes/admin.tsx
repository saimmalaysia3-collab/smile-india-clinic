import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
})

function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage website content, appointments, services and realtime updates.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            Create, update and manage clinic services.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            Track patient leads and appointment requests.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Website CMS</CardTitle>
          </CardHeader>
          <CardContent>
            Edit homepage sections and website content live.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
