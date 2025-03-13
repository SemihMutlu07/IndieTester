import { NextResponse } from "next/server";
import { requireRole } from "../../../lib/auth";

const developers = [
  { id: 1, name: "Alice Dev", email: "alice@example.com", status: "pending" },
];

export async function GET() {
  return NextResponse.json(developers);
}

export async function PATCH(req: Request) {
  const session = await requireRole("admin");

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await req.json();
  const developer = developers.find((d) => d.id === id);

  if (developer) {
    developer.status = status;
    return NextResponse.json({ message: "Developer status updated." });
  }

  return NextResponse.json({ error: "Developer not found." }, { status: 404 });
}
