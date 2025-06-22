import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppointmentsWithService } from "./appointments-list";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/formatCurrency";

interface AppointmentDialogProps {
  appointments: AppointmentsWithService | null;
}

export function AppointmentDialog({ appointments }: AppointmentDialogProps) {
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

            <p>
              <span className="font-semibold">E-mail:</span>{" "}
              {appointments.email}
            </p>
            <br />
            <p>
              <span className="font-semibold">Horário agendado:</span>{" "}
              {appointments.time}
            </p>

            <p>
              <span className="font-semibold">Data do agendamento:</span>{" "}
              {new Intl.DateTimeFormat("pt-BR", {
                timeZone: "UTC",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date(appointments.appointmentDate))}
            </p>

            <div className="bg-neutral-100 mt-4 rounded p-2">
              <p>
                <span className="font-semibold">Serviço:</span>{" "}
                {appointments.service.name}
              </p>

              <p>
                <span className="font-semibold">Valor:</span>{" "}
                {formatCurrency(appointments.service.price / 100)}
              </p>
            </div>
          </article>
        )}
      </div>
    </DialogContent>
  );
}
