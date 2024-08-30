"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

interface IProp {
  params: { slug: string };
}
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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

const userRankOption: ApexOptions = {
  // plotOptions:{

  // },
  chart: {
    height: 350,
    type: "donut",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
    formatter: function (val) {
      return val + "%";
    },
  },
  title: {
    text: "순위 비율",
    align: "left",
  },
};

export default function UserDetail({ params }: IProp) {
  console.log("parmas", decodeURIComponent(params.slug));

  return <div>UserDetailPage</div>;
}
