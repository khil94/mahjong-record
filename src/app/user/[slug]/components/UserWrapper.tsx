"use client";

import Loading from "@/components/Loading";
import { UserRootState } from "@/lib/store";
import { useSelector } from "react-redux";
import History from "./History";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

interface IProp {
  id: string;
}

export default function UserWrapper({ id }: IProp) {
  const { users, loading } = useSelector((state: UserRootState) => state.users);
  const target = users.find((t) => t.id === id);

  return (
    <>
      {loading || !target ? (
        <Loading size={50} />
      ) : (
        <>
          <h1 className="text-3xl font-bold">{`${target.name}의 상세 정보`}</h1>
          <div
            className="flex md:flex-col flex-row 
              [&_div]:flex-auto mlg:min-h-[50%] min-h-fit w-full justify-center items-center"
          >
            <PieChart target={target} loading={loading} />
            <LineChart target={target} loading={loading} />
          </div>
          <div className=" w-4/5 sm:w-full">
            <h2 className="text-2xl font-bold mb-8">대전 기록</h2>
            <History id={target.id} />
          </div>
        </>
      )}
    </>
  );
}
