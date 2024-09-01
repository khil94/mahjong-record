"use client";
import { getAllGameData } from "@/api/firebase";
import GameHistory from "@/components/GameHistory";
import Loading from "@/components/Loading";
import { IGameData } from "@/types/dataTypes";
import { paintRank } from "@/utils/globalFuncs";
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

  const RecentGameRank = () => {
    return (
      <div className="flex w-full justify-evenly pb-4">
        {gameData.slice(0, 10).map((v, i) => {
          const temp = v.detail.find((k) => k.userName === name);
          return (
            <div
              className={` text-lg ${paintRank(
                temp.rank
              )} p-4 pl-6 pr-6 rounded-xl border-solid border-border border-2`}
              key={`recent-game-${i}`}
            >
              {temp.rank}
            </div>
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
          <GameHistory target={name} gameData={gameData} sizeType="md" />
        </div>
      )}
    </div>
  );
}
