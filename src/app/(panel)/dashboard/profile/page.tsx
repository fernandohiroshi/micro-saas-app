// Imports
import { redirect } from "next/navigation";

// Libs
import getSession from "@/lib/getSession";

// Data
import { getUserData } from "./_data-access/get-info-user";

// Components
import { ProfileContent } from "./_components/profile";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const user = await getUserData({ userId: session.user?.id });

  if (!user) {
    redirect("/");
  }

  return <ProfileContent user={user} />;
}
