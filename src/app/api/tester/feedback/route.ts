import { NextResponse } from "next/server";
import { requireRole } from "../../../lib/auth";

const feedbacks = [];

export async function POST(req: Request) {
  const session = await requireRole("tester");

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { gameId, comment } = await req.json();
  feedbacks.push({ gameId, comment, tester: session.user.email });

  return NextResponse.json({ message: "Feedback submitted." }, { status: 201 });
}
