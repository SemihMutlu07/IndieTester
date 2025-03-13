import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Define custom user type
interface CustomUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "developer" | "tester";
}

// Mock user database (Replace this with a real database later)
const users: CustomUser[] = [
  { id: "1", name: "John Doe", email: "john@example.com", password: bcrypt.hashSync("password123", 10), role: "admin" },
  { id: "2", name: "Alice Dev", email: "alice@example.com", password: bcrypt.hashSync("devpass", 10), role: "developer" },
  { id: "3", name: "Bob Tester", email: "bob@example.com", password: bcrypt.hashSync("testpass", 10), role: "tester" },
];

// Extend the built-in session and JWT types
declare module "next-auth" {
  interface User extends Omit<CustomUser, "password"> {}
  
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      role?: "admin" | "developer" | "tester";
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "admin" | "developer" | "tester";
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user
        const user = users.find(u => u.email === credentials.email);
        if (!user) return null;

        // Verify password
        const isValidPassword = user.password && bcrypt.compareSync(credentials.password, user.password);

        if (!isValidPassword) return null;

        // Return user without the password
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // We can't access user directly in redirect callback
      // Instead, we'll handle redirection in middleware or page component
      return baseUrl;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };