import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async session({ token, session }) {
      return session;
      // console.log(token);
      // if (token) {
      //   session.user.id = token.id;
      //   session.user.name = token.name;
      //   session.user.email = token.email;
      //   session.user.role = token.role;
      //   session.user.picture = token.picture;
      // }
      // return session;
    },
    async jwt({ token, user, account }) {
      return token;

      // console.log(user);
      // if (!token.email || !token.name) {
      //   token.id = user?.id;
      //   return token;
      // }
      // const dbUser = await db.user.findUnique({
      //   where: {
      //     email: token.email,
      //   },
      // });
      // if (!dbUser) {
      //   const newUser = await db.user.create({
      //     data: {
      //       email: token.email,
      //       name: token.name,
      //     },
      //   });
      //   token.id = String(newUser.id);
      //   token.name = newUser.name;
      //   token.email = newUser.email;
      //   token.role = newUser.role;
      //   token.picture = newUser.picture || null!;
      //   return token;
      // }
      // token.id = dbUser.id;
      // token.name = dbUser.name;
      // token.email = dbUser.email;
      // token.role = dbUser.role;
      // token.picture = dbUser.picture || null!;
      // return token;
    },
  },
};
