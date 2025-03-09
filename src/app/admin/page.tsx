"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") return <p>Loading...</p>;

    if (!session?.user || session.user.role !== "admin" ) {
        router.push("/");
        return null;
    }   

    return <h1>Welcome, {session.user?.name}! This is the admin page.</h1>;
}