"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import GameGrid from '../components/GameGrid'; 

interface Game {
    id: string;
    title: string;
    description: string;
    imageUrl?: string; 
}

export default function Dashboard() {
    const router = useRouter();
    const [games, setGames] = useState<Game[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login');
            } else {
                setUserEmail(user.email);
            }
        });
        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "games"));
                const gameList: Game[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Game[];
                setGames(gameList);
            } catch (error) {
                console.error("Error fetching games: ", error);

            }
        };

        fetchGames();
    }
    , []);

    return (
        <div className='min-h-screen bg-accent text-deep-dark p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold'>Dashboard</h1>
                <button
                    onClick={() => auth.signOut()}
                    className='bg-primary text-white px-4 py-2 rounded hover:bg-secondary'
                >
                    Add a Game
                </button>
            </div>

            <p className='mb-4 text-sm text-dark'>Welcome {userEmail || "User"}, here are the available games: </p>

            <GameGrid games={games} />
        </div>  
    );
}