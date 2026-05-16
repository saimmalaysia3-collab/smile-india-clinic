import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function ServicesManager() {
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    const { data } = await supabase.from('services').select('*')
    setServices(data || [])
  }

  return (
    <div className="rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">Services Manager</h2>

      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.id} className="rounded-lg border p-4">
            <h3 className="font-medium">{service.title}</h3>
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
