import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcrypt";
import prisma from "@/db/prisma";

/**
 * Tutorial: https://www.youtube.com/watch?v=bicCg4GxOP8&list=LL&index=5&t=1003s
 */

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials.email as any,
          },
        });
        if (!existingUser) {
          console.log("No user found");
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password,
        );
        if (!passwordMatch) {
          console.log("Password does not match");
          return null;
        }

        return {
          id: `${existingUser.id}`,
          userName: existingUser.userName,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("1. token is: ", token, "1. user is: ", user);
      if (user) {
        return {
          ...token,
          userName: user.userName,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("2. session is: ", session, "2. token is: ", token);
      return {
        ...session,
        user: {
          ...session.user,
          userName: token.userName,
        },
      } as any;
    },
  },
});
