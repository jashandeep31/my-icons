import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (!token.email || !token.name) {
        token.id = user?.id;
        return token;
      }
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (!dbUser) {
        const newUser = await db.user.create({
          data: {
            email: token.email,
            name: token.name,
          },
        });
        token.id = String(newUser.id);
        token.name = newUser.name;
        token.email = newUser.email;
        return token;
      }
      token.id = String(dbUser.id);
      token.name = dbUser.name;
      token.email = dbUser.email;
      return token;
    },
  },
};
