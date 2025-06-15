"use server";

// Next.js
import { revalidatePath } from "next/cache";

// External libraries
import { z } from "zod";

// Internal libs
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Validation schema for deleting a service
const formSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
});

type FormSchema = z.infer<typeof formSchema>;

// Action to soft-delete a service (set status to false)
export async function deleteService(formData: FormSchema) {
  const session = await auth();

  // Ensure user is authenticated
  if (!session?.user?.id) {
    return {
      error: "Failed to delete service",
    };
  }

  // Validate input data
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    // Soft-delete the service (disable it instead of removing)
    await prisma.service.update({
      where: {
        id: formData.serviceId,
        userId: session.user.id,
      },
      data: {
        status: false,
      },
    });

    // Revalidate the services page to reflect changes
    revalidatePath("/dashboard/services");

    return {
      data: "Service deleted successfully!",
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Failed to delete service",
    };
  }
}
