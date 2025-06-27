"use client"

import { useState } from "react"
import Link from "next/link"

import { Pencil, Plus, Trash } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Service } from "@/generated/prisma"
import { formatCurrency } from "@/utils/formatCurrency"
import { ResultPermissionProps } from "@/utils/permissions/canPermission"

import { deleteService } from "../_actions/delete-service"

import ServiceDialog from "./service-dialog"

interface ServiceListProps {
  services: Service[]
  permission: ResultPermissionProps
}

export default function ServicesList({
  services,
  permission,
}: ServiceListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<null | Service>(null)
  const servicesList = permission.hasPermission
    ? services
    : services.slice(0, 3)

  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId })

    if (response.error) return

    toast.success(response.data)
  }

  function handleEditService(service: Service) {
    setEditingService(service)
    setIsDialogOpen(true)
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open)

        if (!open) {
          setEditingService(null)
        }
      }}
    >
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold md:text-2xl">
              Serviços
            </CardTitle>

            {permission.hasPermission && (
              <DialogTrigger asChild>
                <Button>
                  <Plus />
                </Button>
              </DialogTrigger>
            )}

            {!permission.hasPermission && (
              <Link
                href="/dashboard/plans"
                className="animate-pulse text-red-600"
              >
                Limite de serviços atingido
              </Link>
            )}

            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault()
                setIsDialogOpen(false)
                setEditingService(null)
              }}
            >
              <ServiceDialog
                closeModal={() => {
                  setIsDialogOpen(false)
                  setEditingService(null)
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
                          editingService.duration / 60,
                        ).toString(),
                        minutes: (editingService.duration % 60).toString(),
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="mt-5 space-y-4">
              {servicesList.map((service) => (
                <article
                  key={service.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2 text-xs sm:text-sm lg:text-base">
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
                      className="hover:bg-red-100"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash className="text-red-700" />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  )
}
