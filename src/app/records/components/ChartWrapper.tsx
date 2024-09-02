"use client";
import { db } from "@/api/firebase";
import Loading from "@/components/Loading";
import MultitabLayout from "@/containers/MultitabLayout";
import { IGameData, IUser } from "@/types/dataTypes";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import GameHistory from "../../../components/GameHistory";
import RankDataChart from "./RankDataChart";
import UserUmaChart from "./UserUmaChart";

interface IProp {
  gameData: IGameData[];
  userData: IUser[];
}

export default function ChartWrapper({ gameData, userData }: IProp) {
  const [liveGameData, setLiveGameData] = useState<IGameData[]>(gameData);
  const [liveUserData, setLiveUserData] = useState<IUser[]>(userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 게임 데이터 실시간 구독
    const unsubscribeGameData = onSnapshot(
      collection(db, "games"),
      (snapshot) => {
        const updatedGameData = snapshot.docs.map(
          (doc) => doc.data() as IGameData
        );
        setLiveGameData(updatedGameData);
        setLoading(false);
      }
    );

    // 유저 데이터 실시간 구독
    const unsubscribeUserData = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const updatedUserData = snapshot.docs.map((doc) => doc.data() as IUser);
        setLiveUserData(updatedUserData);
        setLoading(false);
      }
    );

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribeGameData();
      unsubscribeUserData();
    };
  }, []);

  return loading ? (
    <Loading size={50} />
  ) : (
    <MultitabLayout
      tabList={["리더보드", "우마 그래프", "게임 기록"]}
      tabCompList={[
        <RankDataChart key={`multitab-rank-data`} userData={liveUserData} />,
        <UserUmaChart
          key={`multitab-user-leaderboard`}
          userData={liveUserData}
        />,
        <GameHistory key={`multitab-game-history`} gameData={liveGameData} />,
      ]}
    />
  );
}
