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
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
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
