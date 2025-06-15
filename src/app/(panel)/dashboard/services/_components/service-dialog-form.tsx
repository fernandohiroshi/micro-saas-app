// External libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema for service dialog form
const formSchema = z.object({
  name: z.string().min(1, { message: "O nome do serviço é obrigatório" }),
  price: z.string().min(1, { message: "O preço do serviço é obrigatório" }),
  hours: z.string(),
  minutes: z.string(),
});

export interface useDialogServiceFormProps {
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

// Custom hook for service dialog form
export function useDialogServiceForm({
  initialValues,
}: useDialogServiceFormProps) {
  return useForm<DialogServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      price: "",
      hours: "",
      minutes: "",
    },
  });
}
