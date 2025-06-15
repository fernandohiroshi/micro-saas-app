"use server";

// Next.js
import { revalidatePath } from "next/cache";

// External libraries
import { z } from "zod";

// Internal libs
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Validation schema for updating a service
const formSchema = z.object({
  serviceId: z.string().min(1, { message: "Service ID is required" }),
  name: z.string().min(1, { message: "Service name is required" }),
  price: z.number().min(1, { message: "Service price is required" }),
  duration: z.number(),
});

type FormSchema = z.infer<typeof formSchema>;

// Action to update an existing service
export async function updateService(formData: FormSchema) {
  const session = await auth();

  // Check if the user is authenticated
  if (!session?.user?.id) {
    return {
      error: "Failed to update service",
    };
  }

  // Validate input data against schema
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    // Update the service with new values
    await prisma.service.update({
      where: {
        id: formData.serviceId,
        userId: session.user.id,
      },
      data: {
        name: formData.name,
        price: formData.price,
        // Ensure minimum duration of 30 minutes
        duration: formData.duration < 30 ? 30 : formData.duration,
      },
    });

    // Revalidate services page to reflect changes
    revalidatePath("/dashboard/services");

    return {
      data: "Service updated successfully!",
    };
  } catch (err) {
    console.log(err);
  }

  return {
    error: "Failed to update service",
  };
}
