import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Mock user database (Replace this with a real database later)
const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", password: bcrypt.hashSync("password123", 10), role: "admin" },
  { id: "2", name: "Alice Dev", email: "alice@example.com", password: bcrypt.hashSync("devpass", 10), role: "developer" },
  { id: "3", name: "Bob Tester", email: "bob@example.com", password: bcrypt.hashSync("testpass", 10), role: "tester" },
];

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user
        const user = users.find(u => u.email === credentials.email);
        if (!user) return null;

        // Verify password
        const isValidPassword = bcrypt.compareSync(credentials.password, user.password!);

        if (!isValidPassword) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
      };      },
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
        session.user.role = token.role as "admin" | "developer" | "tester"; 
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };