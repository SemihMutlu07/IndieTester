import { useState } from "react";

interface Game {
  id: number;
  name: string;
  genre: string;
  ownerId: string;
}

const currentUserId = ""; // geçici

export default function GameManager() {
  const [games, setGames] = useState<Game[]>([]);
  const [newGame, setNewGame] = useState({ name: "", genre: "" });

  const addGame = () => {
    if (!newGame.name || !newGame.genre) return;
    const game: Game = {
      id: Date.now(), // geçici
      name: newGame.name,
      genre: newGame.genre,
      ownerId: currentUserId, 
    };
    setGames([...games, game]);
    setNewGame({ name: "", genre: "" });
  };

  const deleteGame = (id: number) => {
    setGames(games.filter((game) => game.id !== id));
  };

  const updateGame = (id: number, name: string, genre: string) => {
    setGames(
      games.map((game) =>
        game.id === id ? { ...game, name, genre } : game
      )
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Oyun Yönetimi</h1>
      <p>Giriş yapan kullanıcı: <strong>{currentUserId}</strong></p>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Oyun Adı"
          value={newGame.name}
          onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Tür"
          value={newGame.genre}
          onChange={(e) => setNewGame({ ...newGame, genre: e.target.value })}
        />
        <button className="bg-blue-500 text-white p-2" onClick={addGame}>
          Ekle
        </button>
      </div>
      <ul>
        {games.map((game) => (
          <li key={game.id} className="mb-2 border p-2">
            <span className="mr-2">{game.name} - {game.genre} (Ekleyen: {game.ownerId})</span>
            <button
              className="bg-red-500 text-white p-1 mr-2"
              onClick={() => deleteGame(game.id)}
            >
              Sil
            </button>
            <button
              className="bg-green-500 text-white p-1"
              onClick={() => updateGame(
                game.id,
                prompt("Yeni isim: ", game.name) || game.name,
                prompt("Yeni tür: ", game.genre) || game.genre
              )}
            >
              Güncelle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
