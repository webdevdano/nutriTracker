/**
 * @deprecated Supabase has been replaced by NextAuth.
 * Use useSession() from 'next-auth/react' for auth in client components.
 * Use fetch('/api/...') routes for data access.
 */
export function createClient(): never {
  throw new Error(
    "Supabase client is no longer available. Use useSession() from next-auth/react and fetch API routes instead.",
  );
}
