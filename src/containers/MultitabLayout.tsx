import * as React from "react";
import { useState } from "react";

interface IProp {
  tabList: string[];
  tabCompList: React.ReactNode[];
}

export default function MultitabLayout({ tabList, tabCompList }: IProp) {
  const [idx, setIdx] = useState(0);

  return (
    <div className="w-3/4 sm:w-full sm:h-full h-3/4 flex flex-col justify-center">
      <div className="flex border-solid border-b-[1px]">
        {tabList.map((v, i) => {
          return (
            <div
              key={`multitab-${v}`}
              className={` border-[1px] border-solid rounded-t-md p-2 ${
                idx === i && "bg-bgOpp text-textOpp font-bold"
              } cursor-pointer`}
              onClick={() => setIdx(i)}
            >
              {v}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center pt-4 pb-4 h-full overflow-auto ">
        {tabCompList[idx]}
      </div>
    </div>
  );
}
