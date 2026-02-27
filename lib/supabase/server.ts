/**
 * @deprecated Supabase has been replaced by NextAuth + Prisma.
 * Use getServerUser() from '@/lib/auth-helpers' for auth in server components/routes.
 * Use prisma from '@/lib/prisma' for database access.
 */
export async function createClient() {
  throw new Error(
    "Supabase client is no longer available. Use getServerUser() from @/lib/auth-helpers and prisma from @/lib/prisma instead.",
  );
}
