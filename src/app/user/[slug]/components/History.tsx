"use client";
import { getAllGameData } from "@/api/firebase";
import GameHistory from "@/components/GameHistory";
import Loading from "@/components/Loading";
import { IGameData } from "@/types/dataTypes";
import { useEffect, useState } from "react";
import RecentRank from "./RecentRank";

interface IProp {
  id: string;
}

export default function History({ id }: IProp) {
  const [gameData, setGameData] = useState<IGameData[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGameData = async () => {
      const resp = await getAllGameData();
      setGameData(
        resp.docs
          .map((v) => ({ ...v.data() }))
          .filter((t) => t.detail.some((k) => k.userId === id))
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      );
      setLoading(false);
    };
    getGameData();
  }, [id]);

  const RecentGameRank = () => {
    return (
      <div className="flex w-full justify-evenly pb-8 md:grid md:grid-cols-5 md:grid-rows-2">
        {gameData.slice(0, 10).map((v, i) => {
          const temp = v.detail.find((k) => k.userId === id);
          return (
            <RecentRank key={`recent-game-${i}`} data={v} targetData={temp} />
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {loading ? (
        <Loading size={50} />
      ) : (
        <div className="flex flex-col">
          <RecentGameRank />
          <GameHistory targetId={id} gameData={gameData} sizeType="md" />
        </div>
      )}
    </div>
  );
}
