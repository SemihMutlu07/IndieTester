"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DeveloperPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (!session?.user || session.user.role !== "developer") {
    router.push("/"); // Redirect if not developer
    return null;
  }

  return <h1>Welcome Developer! Here you can manage your games.</h1>;
}
