import { getAllGameData, getUserData } from "@/api/firebase";
import { IGameData, IUser } from "@/types/dataTypes";
import { Suspense } from "react";
import ChartWrapper from "./components/ChartWrapper";

export default async function Records() {
  const gameDataSet = await getAllGameData();
  const userDataSet = await getUserData();

  const gameDataList: IGameData[] = gameDataSet.docs.map((v) => ({
    ...v.data(),
  }));
  const userDataList: IUser[] = userDataSet.docs.map((v) => ({ ...v.data() }));

  return (
    <Suspense fallback={<div>로딩</div>}>
      <ChartWrapper gameData={gameDataList} userData={userDataList} />
    </Suspense>
  );
}
