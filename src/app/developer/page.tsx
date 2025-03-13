import { requireRole } from "../lib/auth";

export default async function DeveloperRole() {
  const session = await requireRole("developer");

  if (!session) {
    return <h1>Access Denied</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Developer Dashboard</h1>
      <p>Manage your games here.</p>

      <a href="/developer/add" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">
        Add New Game
      </a>
    </div>
  );
}