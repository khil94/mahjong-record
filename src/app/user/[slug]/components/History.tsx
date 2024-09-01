"use client";
import { getAllGameData } from "@/api/firebase";
import GameHistory from "@/components/GameHistory";
import { IGameData } from "@/types/dataTypes";
import { useEffect, useState } from "react";

interface IProp {
  name: string;
}

export default function History({ name }: IProp) {
  const [gameData, setGameData] = useState<IGameData[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGameData = async () => {
      const resp = await getAllGameData();
      setGameData(
        resp.docs
          .map((v) => ({ ...v.data() }))
          .filter((t) => t.detail.some((k) => k.userName === name))
      );
      setLoading(false);
    };
    getGameData();
  }, []);

  return (
    <div className="w-full h-full">
      {loading ? (
        <></>
      ) : (
        <GameHistory target={name} gameData={gameData} sizeType="md" />
      )}
    </div>
  );
}
