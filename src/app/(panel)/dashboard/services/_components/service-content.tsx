import { LabelSubscription } from "@/components/ui/label-subscription"
import { canPermission } from "@/utils/permissions/canPermission"

import { getAllServices } from "../_data-access/get-all-services"

import ServicesList from "./services-list"

interface ServiceContentProps {
  userId: string
}

export async function ServicesContent({ userId }: ServiceContentProps) {
  const services = await getAllServices({ userId })
  const permissions = await canPermission({ type: "service" })

  return (
    <>
      {!permissions.hasPermission && (
        <LabelSubscription expired={permissions.expired} />
      )}
      <ServicesList services={services.data || []} permission={permissions} />
    </>
  )
}
