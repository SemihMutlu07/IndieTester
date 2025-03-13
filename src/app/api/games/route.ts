import { NextResponse } from 'next/server';
import { requireRole } from "@/app/lib/auth";

const games = [
    { id: 1, name: "Super Mario Bros.", description: "A test game", status: "pending" },
    { id: 2, name: "Zelda", description: "Another test game", status: "approved" }
];

export async function GET() {
    return NextResponse.json(games);
}

export async function POST(req: Request) {
    const session = await requireRole("developer");
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const { name, description } = await req.json();
    const newGame = { id: Date.now(), name, description, status: "pending" };
    games.push(newGame);
  
    return NextResponse.json(newGame, { status: 201 });
  }