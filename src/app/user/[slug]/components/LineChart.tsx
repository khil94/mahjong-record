"use client";

import LineChartComp from "@/components/LineChartComp";
import Loading from "@/components/Loading";
import { UserRootState } from "@/lib/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";

interface IProp {
  name: string;
}

export default function LineChart({ name }: IProp) {
  const { users, loading } = useSelector((state: UserRootState) => state.users);
  const targetData = users.find((v) => v.name === name);

  const makeUmaLineSeries = () => {
    const temp = [];
    if (targetData) {
      temp.push({
        name: name,
        data: targetData.history.map((t, i) => {
          return targetData.history
            .slice(0, i + 1)
            .reduce((p, c) => p + c.uma, 0);
        }),
      });
    }

    return temp;
  };

  const userUmaData = useMemo(() => makeUmaLineSeries(), [users]);

  return (
    <div className="md:h-80 flex md:w-full w-1/2 justify-center items-center">
      {loading ? <Loading size={50} /> : <LineChartComp series={userUmaData} />}
    </div>
  );
}
