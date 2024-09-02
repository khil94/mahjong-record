import { getAllGameData, getUserData } from "@/api/firebase";
import Loading from "@/components/Loading";
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
    <Suspense fallback={<Loading size={50} />}>
      <ChartWrapper gameData={gameDataList} userData={userDataList} />
    </Suspense>
  );
}
