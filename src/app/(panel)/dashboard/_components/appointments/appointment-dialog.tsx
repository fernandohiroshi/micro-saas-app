import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppointmentsWithService } from "./appointments-list";

interface AppointmentDialogProps {
  appointments: AppointmentsWithService | null;
}

export function AppointmentDialog({ appointments }: AppointmentDialogProps) {
  console.log("DETALHES DO AGENDAMENTO: ", appointments);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Detalhes do agendamento</DialogTitle>
        <DialogDescription>
          Veja todos os detalhes do agendamento
        </DialogDescription>
      </DialogHeader>

      <div className="py-4">
        {appointments && (
          <article>
            <p>
              <span className="font-semibold">Nome:</span> {appointments.name}
            </p>

            <p>
              <span className="font-semibold">Telefone:</span>{" "}
              {appointments.phone}
            </p>
          </article>
        )}
      </div>
    </DialogContent>
  );
}
