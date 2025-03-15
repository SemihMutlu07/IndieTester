"use client"
import React, { useState, useEffect } from 'react';
import { getGameList} from '../services/gameServices';
import { Game } from "next-auth";

export default function GamesDashboard() {
    //Oyunların düzgün bir şekilde gözüküp gözükmediğini görmek için test componentidir.
    //Game type belirtildi

    const [gameList, setGameList] = useState<Game[]>([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await getGameList();
            setGameList(data);
        };
        fetchData();
    }, []);

   
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-accent text-deep-dark p-6">
      <div className="flex gap-4">
      <h1>OYUNLAR</h1>
      <hr/>
      <div>
        {gameList.length != 0 ? gameList.map((game) =>(
          <div>
            <h1> {game.title}</h1>
            <p> {game.explanation}</p>
            <p> <strong> Ekleme Tarihi: </strong> {game.publishDate}</p>
            <hr/>
          </div>
          
        )) : <div> Hiç oyun yok. </div>}
      </div>
      
      </div>
     
    </div>
    
  );
}
