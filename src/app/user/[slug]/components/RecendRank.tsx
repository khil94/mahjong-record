"use client";

import { IGameData, IGameDetail } from "@/types/dataTypes";
import { getYYMMDD, paintRank } from "@/utils/globalFuncs";
import { useState } from "react";

interface IProp {
  targetData: IGameDetail;
  data: IGameData;
}

export default function RecentRank({ data, targetData }: IProp) {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className=" relative">
      <div
        onMouseEnter={() => setShowDesc(true)}
        onMouseLeave={() => setShowDesc(false)}
        className={` text-lg ${paintRank(
          targetData.rank
        )} p-4 pl-6 pr-6 rounded-xl border-solid border-border border-2`}
      >
        {targetData.rank}
      </div>
      {showDesc && (
        <div
          className="bg-main text-white flex flex-col w-52 
        rounded-md absolute p-6 top-0 left-1/2 
        translate-x-[-50%] translate-y-[-100%]
        after:absolute after:w-3 after:h-3 after:border-t-[10px] after:border-r-[10px]
        after:border-main after:left-1/2 after:bottom-0 
        after:translate-x-[-50%] after:translate-y-[0.4rem] after:rotate-[135deg]
        "
        >
          <span>{getYYMMDD(new Date(data.date))}</span>
          {data.detail.map((k) => (
            <span>{`${k.rank}위 ${k.userName} : ${k.score}`}</span>
          ))}
        </div>
      )}
    </div>
  );
}
