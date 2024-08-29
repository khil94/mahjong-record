"use client";

import { IUser } from "@/types/dataTypes";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

interface IProp {
  userData: IUser[];
}
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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

  const userUmaOption: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "우마 변동 내역",
      align: "left",
    },
  };

  return (
    <div className="w-full">
      <Chart
        options={userUmaOption}
        series={userUmaData}
        type="line"
        height={500}
        width={"100%"}
      />
    </div>
  );
}

const UserUmaChart = memo(UmaChart, (prev, next) => {
  return prev.userData.every((v, i) => {
    if (v.currentUma !== next.userData[i].currentUma) return false;
  });
});

export default UserUmaChart;
