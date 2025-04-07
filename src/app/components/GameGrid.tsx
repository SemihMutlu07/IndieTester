"use client";

import GameCard from "./GameCard";

interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface GameGridProps {
  games: Game[];
}

export default function GameGrid({ games }: GameGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          title={game.title}
          description={game.description}
          imageUrl={game.imageUrl}
        />
      ))}
    </div>
  );
}
