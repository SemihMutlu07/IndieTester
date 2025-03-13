import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
// import { NextResponse } from 'next/server';

export async function requireRole(role: "admin" | "developer" | "tester") {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== role) {
        return null;
    }

    return session;
}