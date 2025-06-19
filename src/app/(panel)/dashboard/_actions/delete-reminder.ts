"use server";

import prisma from "@/lib/prisma";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { date, z } from "zod";

const formSchema = z.object({
  reminderId: z
    .string({ errorMap: () => ({ message: "O ID do lembrete é obrigatório" }) })
    .min(1, "O ID do lembrete é obrigatório"),
});

type FormSchema = z.infer<typeof formSchema>;

export async function deleteReminder(formData: FormSchema) {
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    await prisma.reminder.delete({
      where: {
        id: formData.reminderId,
      },
    });

    revalidatePath("/dashboard");

    return {
      data: "Lembrete deletado com sucesso!",
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Não foi possivel deletar o lembrete",
    };
  }
}
