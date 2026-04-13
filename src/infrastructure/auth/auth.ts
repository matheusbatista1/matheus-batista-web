import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../database/prisma";
import authConfig from "./auth.config";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: { strategy: "database" },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (!ADMIN_EMAIL) return false;
      if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return false;
      }
      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
