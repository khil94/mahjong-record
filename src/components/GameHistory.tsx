import { IGameData } from "@/types/dataTypes";
import { getYYMMDD, paintRank1and4 } from "@/utils/globalFuncs";
import Link from "next/link";
import { memo, useState } from "react";

const DATA_SIZE = 30;
const PAGE_SIZE = 5;

const HistoryColList = {
  default: "grid-cols-1 mlg:grid-cols-2 mxlg:grid-cols-3",
  md: "grid-cols-1 mlg:grid-cols-2 mxlg:grid-cols-3",
} as const;

interface IProp {
  gameData: IGameData[];
  targetId?: string;
  sizeType?: keyof typeof HistoryColList;
}

function HistoryComp({ gameData, targetId, sizeType = "default" }: IProp) {
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
                key={`game-history-${data.id}-${v.userName}-${date}`}
                className={`${
                  v.rank === 1 ? "bg-bgOpp font-bold" : "bg-bgPrimary"
                } ${paintRank1and4(v.rank)} ${
                  v.userId === targetId && "font-bold text-xl"
                } gap-2 rounded border-2 border-solid p-2 border-bgOpp break-keep flex items-center`}
              >
                <div className="flex flex-col justify-center items-start">
                  <span className=" hover:underline">
                    <Link
                      href={`/user/${v.userName}`}
                    >{`${v.userName}(${v.rank}위)`}</Link>
                  </span>
                  <span>{`${v.score}점`}</span>
                  <div className="flex flex-row justify-center items-start">
                    <span>{`${v.changedUma}`}</span>
                    <span
                      className={`${v.uma > 0 ? "text-red" : "text-blue"}`}
                    >{`(${v.uma > 0 ? `+${v.uma}` : v.uma})`}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const pageHandler = (type: "left" | "default" | "right", to: number = 0) => {
    switch (type) {
      case "left":
        if (page > 0) {
          setPage((pageSet - 1) * PAGE_SIZE);
          setPageSet(pageSet - 1);
        }
        break;
      case "right":
        if (page < Math.floor(gameData.length / DATA_SIZE)) {
          setPage((pageSet + 1) * PAGE_SIZE);
          setPageSet(pageSet + 1);
        }
        break;
      case "default":
        setPage(PAGE_SIZE * pageSet + to);
        break;
    }
  };

  return (
    <div className={`w-full h-full grid ${HistoryColList[sizeType]} gap-4 `}>
      {gameData.length === 0 ? (
        <span>대전기록이 존재하지 않습니다.</span>
      ) : (
        gameData.slice(page * DATA_SIZE, (page + 1) * DATA_SIZE).map((v) => {
          return <GameHistoryData key={`game-history-data-${v.id}`} data={v} />;
        })
      )}
      <div className="w-full flex justify-center col-span-full gap-4 [&_span]:cursor-pointer hover:[&_span]:font-bold">
        {pageSet >= 1 && (
          <span
            onClick={() => {
              pageHandler("left");
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
              key={`page-list-${i}`}
              className={`${
                PAGE_SIZE * pageSet + i === page && "font-bold text-xl"
              } `}
              onClick={() => pageHandler("default", i)}
            >
              {PAGE_SIZE * pageSet + i + 1}
            </span>
          ))}
        {(pageSet + 1) * PAGE_SIZE <
          Math.floor(gameData.length / DATA_SIZE) && (
          <span
            onClick={() => {
              pageHandler("right");
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
