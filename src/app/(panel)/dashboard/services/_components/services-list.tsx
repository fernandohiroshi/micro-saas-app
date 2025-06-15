"use client";

// React
import { useState } from "react";

// Icons
import { Pencil, Plus, Trash } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Local Components
import ServiceDialog from "./service-dialog";

// Types & Utils
import { Service } from "@/generated/prisma";
import { formatCurrency } from "@/utils/formatCurrency";

// Actions
import { deleteService } from "../_actions/delete-service";

// External libraries
import { toast } from "sonner";

interface ServiceListProps {
  services: Service[];
}

export default function ServicesList({ services }: ServiceListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<null | Service>(null);

  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId });

    if (response.error) return;

    toast.success(response.data);
  }

  function handleEditService(service: Service) {
    setEditingService(service);
    setIsDialogOpen(true);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="text-xl md:text-2xl font-bold">
              Serviços
            </CardTitle>

            <DialogTrigger asChild>
              <Button>
                <Plus />
              </Button>
            </DialogTrigger>

            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault();
                setIsDialogOpen(false);
                setEditingService(null);
              }}
            >
              <ServiceDialog
                closeModal={() => {
                  setIsDialogOpen(false);
                  setEditingService(null);
                }}
                serviceId={editingService?.id}
                initialValues={
                  editingService
                    ? {
                        name: editingService.name,
                        price: (editingService.price / 100)
                          .toFixed(2)
                          .replace(".", ","),
                        hours: Math.floor(
                          editingService.duration / 60
                        ).toString(),
                        minutes: (editingService.duration % 60).toString(),
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="space-y-4 mt-5">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-neutral-500">-</span>
                    <span className="font-medium text-neutral-500">
                      {formatCurrency(service.price / 100)}
                    </span>
                  </div>

                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditService(service)}
                    >
                      <Pencil />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash className="text-red-800" />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  );
}
