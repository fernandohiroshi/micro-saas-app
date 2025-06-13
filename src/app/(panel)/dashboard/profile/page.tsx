import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import { getUserData } from "./_data-access/get-info-user";
import { ProfileContent } from "./_components/profile";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const user = await getUserData({ userId: session.user?.id });
  // console.log("getUserData: ", user);

  if (!user) {
    redirect("/");
  }

  return <ProfileContent user={user} />;
}
