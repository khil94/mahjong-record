"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IProp {
  series: { name: string; data: number[] }[];
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
  xaxis: {
    labels: {
      show: false,
    },
  },
};

export default function LineChartComp({ series }: IProp) {
  return (
    <Chart
      options={userOption}
      series={series}
      type="line"
      height={"100%"}
      width={"100%"}
    />
  );
}
