"use client";

import Loading from "@/components/Loading";
import { IUser } from "@/types/dataTypes";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IProp {
  target: IUser;
  loading: boolean;
}

const userOption: ApexOptions = {
  labels: ["1위", "2위", "3위", "4위"],
  title: {
    text: "순위 비율",
    align: "left",
    style: {
      color: "var(--color-text)",
      fontSize: "24px",
    },
  },
  legend: {
    fontSize: "16px",
    labels: {
      colors: "var(--color-text)",
    },
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -30,
      },
      donut: {
        labels: {
          value: {
            show: true,
            formatter: function (val: string) {
              return val + "%";
            },
          },
          name: {
            color: "var(--color-text)",
          },
        },
      },
    },
  },
};

export default function PieChart({ target, loading }: IProp) {
  const mkaeRankSeries = () => {
    const temp = [0, 0, 0, 0];
    if (target) {
      target.history.forEach((v) => {
        temp[v.rank - 1]++;
      });
    }

    return temp;
  };

  return (
    <div className="md:h-80 h-full flex md:w-full w-1/2 justify-center items-center">
      {loading ? (
        <Loading size={50} />
      ) : target.history.length === 0 ? (
        <span>대전기록이 존재하지 않습니다.</span>
      ) : (
        <Chart
          options={userOption}
          series={mkaeRankSeries()}
          type="pie"
          height={"100%"}
          width={"100%"}
        />
      )}
    </div>
  );
}
