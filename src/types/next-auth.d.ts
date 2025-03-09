import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "admin" | "developer" | "tester";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // ✅ Added optional password
    role: "admin" | "developer" | "tester";
  }
}
