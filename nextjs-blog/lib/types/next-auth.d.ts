import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    userName: string;
  }

  interface AdapterUser extends User {}

  interface Session {
    user: {
      userName: string;
    } & DefaultSession["user"];
  }
}
