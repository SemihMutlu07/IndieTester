"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface GameCardProps {
    id: string;
    title: string;
    description: string;
    imageUrl?: string; 
}

export default function GameCard({ id, title, description, imageUrl }: GameCardProps) {
    const router = useRouter();

    return (
        <div 
            onClick={() => router.push(`/game/${id}`)}
            className='bg-white rounded shadow p-4 cursor-pointer hover:shadow-md transition'
        >
            {imageUrl ? (
                <Image src={imageUrl} alt={title} className='w-full h-40 object-cover rounded mb-3'/>
            ) : (
                <div className='w-full h-40 bg-gray-300 rounded mb-3 flex items-center justify-center text-gray-500'>
                    No Image
                </div>
            )}
            <h2 className='text-xl font-semibold mb-2'>{title}</h2>
            <p className='text-sm text-gray-700'>{description}</p>
        </div>
    );
}
