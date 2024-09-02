"use client";

import { postUserData } from "@/api/firebase";
import { useAppDispatch } from "@/hooks/userAppDispatch";
import { fetchUsers } from "@/lib/features/users/usersSlice";
import { UserAppDispatch, UserRootState } from "@/lib/store";
import {
  IGameDetail,
  IPostGameData,
  IRank,
  IUserPositionData,
} from "@/types/dataTypes";
import { finalUmaCalc, positionCalc } from "@/utils/globalFuncs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecordContainer from "./components/RecordContainer";
import RecordResultContainer from "./components/RecordResultContainer";

export default function RecordPage() {
  const [gameData, setGameData] = useState<IPostGameData>();
  const [idx, setIdx] = useState(0);
  const [umaSum, setUmaSum] = useState(0);

  const userData = useSelector((state: UserRootState) => state.users.users);
  const dispatch = useAppDispatch<UserAppDispatch>();

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
      date: new Date().toString(),
      detail: tempGameData,
    });

    setIdx(1);
  }

  async function handleSubmitData(data: IPostGameData) {
    await postUserData(data, userData);
    await dispatch(fetchUsers());
  }

  return (
    <div className="w-full flex flex-col justify-center items-center p-4 ">
      <h1 className=" font-bold text-5xl sm:text-2xl mb-16">마작 결과 기록</h1>
      <RecordContainer
        visible={idx === 0 ? "visible" : "hidden"}
        handleSubmit={(v) => {
          handleSubmit(v);
        }}
      />
      <RecordResultContainer
        visible={idx === 1 ? "visible" : "hidden"}
        data={gameData}
        onSubmit={handleSubmitData}
        onCancel={() => {
          setIdx(0);
        }}
        umaSum={umaSum}
      />
    </div>
  );
}
