"use client";
import MultitabLayout from "@/containers/MultitabLayout";
import { IGameData, IUser } from "@/types/dataTypes";
import GameHistory from "../../../components/GameHistory";
import RankDataChart from "./RankDataChart";
import UserUmaChart from "./UserUmaChart";

interface IProp {
  gameData: IGameData[];
  userData: IUser[];
}

export default function ChartWrapper({ gameData, userData }: IProp) {
  return (
    <MultitabLayout
      tabList={["리더보드", "우마 그래프", "게임 기록"]}
      tabCompList={[
        <RankDataChart userData={userData} />,
        <UserUmaChart userData={userData} />,
        <GameHistory gameData={gameData} />,
      ]}
    />
  );
}
