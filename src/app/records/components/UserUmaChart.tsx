"use client";

import LineChartComp from "@/components/LineChartComp";
import { IUser } from "@/types/dataTypes";
import { memo, useCallback, useMemo } from "react";

interface IProp {
  userData: IUser[];
}

function UmaChart({ userData }: IProp) {
  const makeUmaLineSeries = useCallback(() => {
    const temp = userData.map((v) => ({
      name: v.name,
      data: v.history.map((t, i) => {
        return v.history[i].changedUma;
      }),
    }));
    return temp;
  }, [userData]);

  const umaLineSeries = useMemo(() => makeUmaLineSeries(), [makeUmaLineSeries]);

  return (
    <div className="w-full h-full p-8">
      <LineChartComp series={umaLineSeries} />
    </div>
  );
}

const UserUmaChart = memo(UmaChart, (prev, next) => {
  return prev.userData.every((v, i) => {
    if (v.currentUma !== next.userData[i].currentUma) return false;
  });
});

export default UserUmaChart;
