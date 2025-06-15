import { getAllServices } from "../_data-access/get-all-services";
import ServicesList from "./services-list";

interface ServiceContentProps {
  userId: string;
}

export async function ServicesContent({ userId }: ServiceContentProps) {
  const services = await getAllServices({ userId: userId });

  return (
    <div>
      <ServicesList services={services.data || []} />
    </div>
  );
}
