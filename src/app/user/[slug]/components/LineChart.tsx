"use client";

import LineChartComp from "@/components/LineChartComp";
import Loading from "@/components/Loading";
import { IUser } from "@/types/dataTypes";
import { useMemo } from "react";

interface IProp {
  target: IUser;
  loading: boolean;
}

export default function LineChart({ target, loading }: IProp) {
  const makeUmaLineSeries = () => {
    const temp = [];
    if (target) {
      temp.push({
        name: target.name,
        data: target.history.map((t, i) => {
          return target.history.slice(0, i + 1).reduce((p, c) => p + c.uma, 0);
        }),
      });
    }

    return temp;
  };

  const userUmaData = useMemo(() => makeUmaLineSeries(), [target]);

  return (
    <div className="md:h-80 flex md:w-full w-1/2 justify-center items-center">
      {loading ? (
        <Loading size={50} />
      ) : target.history.length === 0 ? (
        <span>대전기록이 존재하지 않습니다.</span>
      ) : (
        <LineChartComp series={userUmaData} />
      )}
    </div>
  );
}
