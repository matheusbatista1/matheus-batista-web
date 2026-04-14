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
    async signIn({ user, account }) {
      if (!ADMIN_EMAIL) return false;
      if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return false;
      }

      // Permitir linking automatico de novas contas OAuth ao user existente
      if (account) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser) {
          const existingAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          });

          if (!existingAccount) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state as string | null,
              },
            });
          }

          // Atualizar foto e nome do perfil OAuth
          if (user.image || user.name) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                ...(user.image && { image: user.image }),
                ...(user.name && !existingUser.name && { name: user.name }),
              },
            });
          }
        }
      }

      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
