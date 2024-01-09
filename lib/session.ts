import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";

export const dynamic = "force-dynamic";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
