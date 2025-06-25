// Internal data-access and components
import { canPermission } from "@/utils/permissions/canPermission";
import { getAllServices } from "../_data-access/get-all-services";
import ServicesList from "./services-list";
import { LabelSubscription } from "@/components/ui/label-subscription";

interface ServiceContentProps {
  userId: string;
}

// Server component that fetches services and renders the list
export async function ServicesContent({ userId }: ServiceContentProps) {
  // Fetch all services for the given user
  const services = await getAllServices({ userId });
  const permissions = await canPermission({ type: "service" });

  return (
    <>
      {!permissions.hasPermission && (
        <LabelSubscription expired={permissions.expired} />
      )}
      <ServicesList services={services.data || []} permission={permissions} />
    </>
  );
}
