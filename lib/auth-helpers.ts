import { auth } from "@/auth";

/**
 * Returns the authenticated user from the NextAuth session.
 * Use in server components and API routes.
 */
export async function getServerUser() {
  const session = await auth();
  return session?.user ?? null;
}
