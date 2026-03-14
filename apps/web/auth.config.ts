/**
 * Edge-compatible auth config.
 * No Prisma, no bcrypt — safe to run in the Next.js Edge Runtime (middleware).
 * The full auth.ts adds the Prisma adapter and Credentials provider on top of this.
 */
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = (user as { emailVerified?: Date | null }).emailVerified ?? null;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      session.user.emailVerified = (token.emailVerified as Date | null | undefined) ?? null;
      return session;
    },
    authorized({ auth }) {
      // Used by middleware: truthy = allowed
      return !!auth;
    },
  },
  pages: {
    signIn: "/login",
  },
};
