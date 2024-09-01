"use client";

import Loading from "@/components/Loading";
import { UserRootState } from "@/lib/store";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IProp {
  name: string;
}

const userOption: ApexOptions = {
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
    style: {
      color: "var(--color-text)",
      fontSize: "24px",
    },
  },
};

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
    <div className="md:h-80 flex justify-center items-center">
      {loading ? (
        <Loading size={50} />
      ) : (
        <Chart
          options={userOption}
          series={userUmaData}
          type="line"
          height={"100%"}
          width={"100%"}
        />
      )}
    </div>
  );
}
