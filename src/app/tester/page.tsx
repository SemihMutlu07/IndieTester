"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TesterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (!session?.user || session.user.role !== "tester") {
    router.push("/"); // Redirect if not tester
    return null;
  }

  return <h1>Welcome Tester! You can review games here.</h1>;
}
