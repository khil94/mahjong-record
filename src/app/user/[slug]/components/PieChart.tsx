"use client";

import Loading from "@/components/Loading";
import { UserRootState } from "@/lib/store";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IProp {
  name: string;
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
          name: {},
        },
      },
    },
  },
};

export default function PieChart({ name }: IProp) {
  const { users, loading } = useSelector((state: UserRootState) => state.users);
  const targetData = users.find((v) => v.name === name);

  const mkaeRankSeries = () => {
    const temp = [0, 0, 0, 0];
    if (targetData) {
      targetData.history.forEach((v) => {
        console.log(v.rank);
        temp[v.rank - 1]++;
      });
      console.log(temp);
    }

    return temp;
  };

  return (
    <div className="md:h-80 flex justify-center items-center">
      {loading ? (
        <Loading size={50} />
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
