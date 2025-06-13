import { getAllServices } from "../_data-access/get-all-services";

interface ServiceContentProps {
  userId: string;
}

export async function ServicesContent({ userId }: ServiceContentProps) {
  const services = await getAllServices({ userId: userId });

  console.log(services);
  return <></>;
}
