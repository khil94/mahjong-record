"use client";

import { IGameData, IGameDetail } from "@/types/dataTypes";
import { getYYMMDD, paintRank } from "@/utils/globalFuncs";
import { useEffect, useRef, useState } from "react";

interface IProp {
  targetData: IGameDetail;
  data: IGameData;
}

const PositionList = {
  left: `left-0 translate-x-0 after:left-4 after:translate-x-0 `,
  default: `left-1/2 -translate-x-1/2 after:left-1/2 after:-translate-x-1/2 `,
  right: `right-0 -translate-x-0 after:right-4 after:-translate-x-0 `,
} as const;

export default function RecentRank({ data, targetData }: IProp) {
  const [showDesc, setShowDesc] = useState(false);
  const [position, setPosition] =
    useState<keyof typeof PositionList>("default");
  const descRef = useRef(null);

  useEffect(() => {
    const tooltip = descRef.current;
    if (!showDesc) {
      setPosition("default");
    } else if (tooltip) {
      const rect = tooltip.getBoundingClientRect();
      console.log(rect, rect.left, rect.right, window.innerWidth);
      if (rect.left < 0) {
        // 왼쪽 화면 밖으로 벗어날 경우
        setPosition("left");
        console.log("left");
      } else if (rect.right > window.innerWidth) {
        // 오른쪽 화면 밖으로 벗어날 경우
        setPosition("right");
        console.log("right");
      } else {
        setPosition("default");
        console.log("default");
      }
    }
  }, [showDesc]);

  return (
    <div className=" relative">
      <div
        onMouseEnter={() => setShowDesc(true)}
        onMouseLeave={() => setShowDesc(false)}
        className={` text-lg ${paintRank(
          targetData.rank
        )} p-4 text-center rounded-xl border-solid border-2`}
      >
        {targetData.rank}
      </div>
      {showDesc && (
        <div
          ref={descRef}
          className={` bg-main text-white flex flex-col w-52 
          rounded-md absolute p-6 top-0
          ${PositionList[position]} translate-y-[-100%]
          after:absolute after:w-3 after:h-3 after:border-t-[10px] after:border-r-[10px]
          after:border-main after:bottom-0 
          after:translate-y-[0.4rem] after:rotate-[135deg]
          `}
        >
          <span>{getYYMMDD(new Date(data.date))}</span>
          {data.detail.map((k) => (
            <span
              key={`desc-for--${data.id}-${k.uma}`}
            >{`${k.rank}위 ${k.userName} : ${k.score}`}</span>
          ))}
        </div>
      )}
    </div>
  );
}
