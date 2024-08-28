"use client";

import {
  IGameDetail,
  IPostGameData,
  IRank,
  IUserPositionData,
} from "@/types/dataTypes";
import { finalUmaCalc, positionCalc } from "@/utils/globalFuncs";
import { useEffect, useState } from "react";
import RecordContainer from "./components/RecordContainer";
import RecordResultContainer from "./components/RecordResultContainer";

export default function RecordPage() {
  const [gameData, setGameData] = useState<IPostGameData>();
  const [idx, setIdx] = useState(0);
  const [umaSum, setUmaSum] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    if (gameData) {
      const newUmaSum = gameData.detail.reduce((p, c) => {
        return p + c.uma;
      }, 0);
      setUmaSum(newUmaSum);
    }
  }, [gameData]);

  function handleSubmit(data: IUserPositionData) {
    const tempGameData = Object.entries(data)
      .map(([k, v]) => {
        return {
          score: v.score,
          uma: v.uma,
          userName: v.userName,
          position: k as keyof IUserPositionData,
        };
      })
      .sort((a, b) => {
        if (a.score === b.score) {
          return positionCalc(a.position, b.position);
        } else {
          return b.score - a.score;
        }
      })
      .map((v, i) => {
        const newUma = finalUmaCalc(v.uma, (i + 1) as IRank);
        return {
          rank: i + 1,
          score: v.score,
          uma: newUma,
          userName: v.userName,
        } as IGameDetail;
      });
    setGameData({
      date: new Date(),
      detail: tempGameData,
    });

    setIdx(1);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <RecordContainer
        visible={idx === 0 ? "visible" : "hidden"}
        handleSubmit={(v) => {
          handleSubmit(v);
        }}
      />
      <RecordResultContainer
        visible={idx === 1 ? "visible" : "hidden"}
        data={gameData}
        onCancel={() => {
          setUmaSum(0);
          setIdx(0);
        }}
        umaSum={umaSum}
      />
    </div>
  );
}
