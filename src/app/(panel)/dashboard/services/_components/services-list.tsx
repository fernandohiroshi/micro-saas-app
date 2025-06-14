"use client";

// React
import { useState } from "react";

// Icons
import { Plus } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Local Components
import ServiceDialog from "./service-dialog";

export default function ServicesList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

            {/* Dialog content for creating a new service */}
            <DialogContent>
              <ServiceDialog
                closeModal={() => {
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </CardHeader>
        </Card>
      </section>
    </Dialog>
  );
}
