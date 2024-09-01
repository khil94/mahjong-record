"use client";

import LineChartComp from "@/components/LineChartComp";
import { IUser } from "@/types/dataTypes";
import { memo, useMemo } from "react";

interface IProp {
  userData: IUser[];
}

function UmaChart({ userData }: IProp) {
  const makeUmaLineSeries = () => {
    const temp = userData.map((v) => ({
      name: v.name,
      data: v.history.map((t, i) => {
        return v.history.slice(0, i + 1).reduce((p, c) => p + c.uma, 0);
      }),
    }));
    return temp;
  };
  const userUmaData = useMemo(() => makeUmaLineSeries(), [userData]);

  return (
    <div className="w-full h-1/2 p-8">
      <LineChartComp series={userUmaData} />
    </div>
  );
}

const UserUmaChart = memo(UmaChart, (prev, next) => {
  return prev.userData.every((v, i) => {
    if (v.currentUma !== next.userData[i].currentUma) return false;
  });
});

export default UserUmaChart;
