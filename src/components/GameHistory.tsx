import { IGameData } from "@/types/dataTypes";
import { getYYMMDD } from "@/utils/globalFuncs";
import Link from "next/link";
import { memo, useState } from "react";

const DATA_SIZE = 20;
const PAGE_SIZE = 5;

const HistoryColList = {
  default: "grid-cols-1 mmd:grid-cols-2 mlg:grid-cols-3",
  md: "grid-cols-1 mlg:grid-cols-2 mxlg:grid-cols-3",
} as const;

interface IProp {
  gameData: IGameData[];
  target?: string;
  sizeType?: keyof typeof HistoryColList;
}

function HistoryComp({ gameData, target, sizeType = "default" }: IProp) {
  gameData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [page, setPage] = useState(0);
  const [pageSet, setPageSet] = useState(0);

  function GameHistoryData({ data }: { data: IGameData }) {
    const date = getYYMMDD(new Date(data.date));
    return (
      <div className="p-2 border-solid rounded-lg border-border border-[1px]">
        {`${date}`}
        <div className=" grid grid-cols-2  grid-rows-2 gap-4">
          {data.detail.map((v) => {
            return (
              <div
                className={`${
                  v.rank === 1
                    ? "bg-bgOpp text-red-400 font-bold"
                    : v.rank === 4
                    ? "bg-border"
                    : "bg-bgPrimary"
                } ${
                  v.userName === target && "font-bold text-xl"
                } rounded border-2 border-solid p-2 border-bgOpp break-keep flex items-center`}
              >
                {`${v.rank}위`}
                <div className="flex flex-col items-end w-full">
                  <span className=" hover:underline">
                    <Link href={`/user/${v.userName}`}>{`${v.userName}`}</Link>
                  </span>
                  <span>{`${v.score}점`}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full overflow-y-scroll grid ${HistoryColList[sizeType]} gap-4 `}
    >
      {gameData.slice(page * DATA_SIZE, (page + 1) * DATA_SIZE).map((v) => {
        return <GameHistoryData data={v} />;
      })}
      <div className="w-full flex justify-center col-span-full gap-4 [&_span]:cursor-pointer hover:[&_span]:font-bold">
        {pageSet >= 1 && (
          <span
            onClick={() => {
              if (page > 0) {
                setPage((pageSet - 1) * PAGE_SIZE);
                setPageSet(pageSet - 1);
              }
            }}
          >
            {"<"}
          </span>
        )}
        {new Array(
          Math.min(
            Math.ceil(
              (gameData.length - PAGE_SIZE * pageSet * DATA_SIZE) / DATA_SIZE
            ),
            5
          )
        )
          .fill(0)
          .map((_, i) => (
            <span
              className={`${PAGE_SIZE * pageSet + i === page && "font-bold"} `}
              onClick={() => setPage(PAGE_SIZE * pageSet + i)}
            >
              {PAGE_SIZE * pageSet + i + 1}
            </span>
          ))}
        {(pageSet + 1) * PAGE_SIZE <
          Math.floor(gameData.length / DATA_SIZE) && (
          <span
            onClick={() => {
              if (page < Math.floor(gameData.length / DATA_SIZE)) {
                setPage((pageSet + 1) * PAGE_SIZE);
                setPageSet(pageSet + 1);
              }
            }}
          >
            {">"}
          </span>
        )}
      </div>
    </div>
  );
}

const GameHistory = memo(HistoryComp);

export default GameHistory;
