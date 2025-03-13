import { requireRole } from "../lib/auth";

export default async function AdminPage() {
  const session = await requireRole("admin");

  if (!session) {
    return <h1>Access Denied</h1>;
  }


  const devRes = await fetch("http://localhost:3000/api/admin/developers", {
    cache: "no-store",
  });
  const developers: Developer[] = await devRes.json();

  const gameRes = await fetch("http://localhost:3000/api/admin/games", {
    cache: "no-store",
  });
  const games: Game[] = await gameRes.json();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Developer Approval Section */}
      <h2 className="text-xl font-semibold mb-2">Pending Developers</h2>
      {developers.map((dev) => (
        <div key={dev.id} className="border p-4 mb-4 rounded">
          <p>Name: {dev.name}</p>
          <p>Email: {dev.email}</p>
          <p>Status: {dev.status}</p>
          <button
            className="bg-green-500 px-3 py-1 rounded mt-2"
            onClick={async () => {
              await fetch("/api/admin/developers", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: dev.id, status: "approved" }),
              });
              window.location.reload();
            }}
          >
            Approve
          </button>
        </div>
      ))}

      {/* Game Approval Section */}
      <h2 className="text-xl font-semibold mb-2">Pending Games</h2>
      {games.map((game) => (
        <div key={game.id} className="border p-4 mb-4 rounded">
          <h2 className="text-lg font-semibold">{game.name}</h2>
          <p>{game.description}</p>
          <p>Status: {game.status}</p>
          <button
            className="bg-green-500 px-3 py-1 rounded mt-2"
            onClick={async () => {
              await fetch("/api/admin/games", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: game.id, status: "approved" }),
              });
              window.location.reload();
            }}
          >
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}