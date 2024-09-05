"use client";

import { db, postUserData } from "@/api/firebase";
import { useAppDispatch } from "@/hooks/userAppDispatch";
import { fetchUsers } from "@/lib/features/users/usersSlice";
import { AppDispatch, RootState } from "@/lib/store";
import {
  IGameDetail,
  IPostGameData,
  IRank,
  IUser,
  IUserPositionData,
} from "@/types/dataTypes";
import { finalUmaCalc, positionCalc } from "@/utils/globalFuncs";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecordContainer from "./components/RecordContainer";
import RecordResultContainer from "./components/RecordResultContainer";

export default function RecordPage() {
  const [gameData, setGameData] = useState<IPostGameData>();
  const [idx, setIdx] = useState(0);
  const [umaSum, setUmaSum] = useState(0);

  const userData = useSelector((state: RootState) => state.users.users);
  const dispatch = useAppDispatch<AppDispatch>();
  const [liveUserData, setLiveUserData] = useState<IUser[]>(userData);

  useEffect(() => {
    if (gameData) {
      const newUmaSum = gameData.detail.reduce((p, c) => {
        return p + c.uma;
      }, 0);
      setUmaSum(newUmaSum);
    }
  }, [gameData]);

  useEffect(() => {
    // 유저 데이터 실시간 구독
    const unsubscribeUserData = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const updatedUserData = snapshot.docs.map((doc) => doc.data() as IUser);
        setLiveUserData(updatedUserData);
      }
    );

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribeUserData();
    };
  }, []);

  function handleSubmit(data: IUserPositionData) {
    const tempGameData = Object.entries(data)
      .map(([k, v]) => {
        return {
          score: v.score,
          uma: v.uma,
          id: v.id,
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
        const targetUser = liveUserData.find((k) => k.id === v.id);
        return {
          rank: i + 1,
          score: v.score,
          uma: newUma,
          userName: targetUser.name,
          userId: targetUser.id,
          changedUma: targetUser.currentUma + v.uma,
        } as IGameDetail;
      });
    setGameData({
      date: new Date().toString(),
      detail: tempGameData,
    });

    setIdx(1);
  }

  async function handleSubmitData(data: IPostGameData) {
    await postUserData(data, liveUserData);
    await dispatch(fetchUsers());
  }

  return (
    <div className="w-full flex flex-col justify-center items-center p-4 gap-4">
      <h1 className=" font-bold text-5xl sm:text-2xl">마작 결과 기록</h1>
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
