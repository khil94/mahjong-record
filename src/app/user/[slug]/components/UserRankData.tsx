import { RankPainter } from "@/constants/styles";
import { IUser, IUserGameData } from "@/types/dataTypes";
import { useEffect, useState } from "react";

interface IProp {
  target: IUser;
}

interface IRankData {
  total: number;
  totalUma: number;
  totalScore: number;
}

const rootData: IRankData = {
  total: 0,
  totalUma: 0,
  totalScore: 0,
};

export default function UserRankData({ target }: IProp) {
  const [solidarityStreak, setSolidarityStreak] = useState(0);
  const [maxMinGame, setMaxMinGame] = useState<IUserGameData[]>([]);

  const getRankData: () => IRankData[] = () => {
    const tempObj = Array(4).fill(rootData);
    target.history.forEach((v) => {
      tempObj[v.rank - 1] = {
        total: tempObj[v.rank - 1].total + 1,
        totalUma: tempObj[v.rank - 1].totalUma + v.uma,
        totalScore: tempObj[v.rank - 1].totalScore + v.score,
      };
    });
    return tempObj;
  };

  useEffect(() => {
    if (target.history.length > 0) {
      const temp = [...target.history];
      temp.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      let currentStreak = 0;
      let maxStreak = 0;
      temp.forEach((v) => {
        if (v.rank === 1 || v.rank === 2) {
          currentStreak++;
          if (currentStreak >= maxStreak) {
            maxStreak = currentStreak;
          }
        } else {
          currentStreak = 0;
        }
      });
      temp.sort((a, b) => b.score - a.score);
      setMaxMinGame([temp[0], temp[temp.length - 1]]);
      setSolidarityStreak(maxStreak);
    }
  }, [target]);

  const UserRankDataComp = ({
    rank,
    rankData,
  }: {
    rank: number;
    rankData: IRankData;
  }) => {
    return (
      <div
        className={`font-bold border-2 border-solid pt-2 pb-2 break-keep text-center 
        !text-text ${RankPainter.borderColor[rank]} ${RankPainter.bgColor[rank]}`}
      >
        <div>{`${rank}위`}</div>
        <div>{`${rankData.total}회 (${(
          (rankData.total * 100) /
          target.history.length
        ).toFixed(1)}%)`}</div>
        <div>{`평균 : ${(rankData.totalScore / rankData.total).toFixed(
          0
        )}점`}</div>
        <div>{`평균 획득 우마 : ${(rankData.totalUma / rankData.total).toFixed(
          0
        )}점`}</div>
      </div>
    );
  };

  return (
    <div className="mlg:w-1/2 w-full">
      <div className=" grid grid-cols-2 grid-rows-2">
        {getRankData().map((v, i) => {
          return (
            <UserRankDataComp
              key={`rank-data-${i}`}
              rank={i + 1}
              rankData={v}
            />
          );
        })}
      </div>
      <div className="border-2 border-solid p-4 grid grid-cols-2 grid-rows-4 text-center items-center [&_div]:break-keep">
        <div>{`총 게임 횟수 : ${target.history.length}회`}</div>
        <div>{`현재 우마 : ${target.currentUma}점`}</div>
        <div>{`평균 획득 우마 : ${(
          target.currentUma / target.history.length
        ).toFixed(1)}점`}</div>
        <div>{`평균 획득 점수 : ${(
          getRankData().reduce((p, c) => p + c.totalScore, 0) /
          target.history.length
        ).toFixed(1)}점`}</div>
        <div>{`토비율 : ${(
          (target.history.filter((k) => k.score < 0).length * 100) /
          target.history.length
        ).toFixed(1)}%`}</div>
        <div>
          {`연대율 : ${(
            (target.history.filter((k) => k.rank === 1 || k.rank === 2).length *
              100) /
            target.history.length
          ).toFixed(1)}%`}
        </div>
        <div>{`연속연대기록 : ${solidarityStreak}회`}</div>
        {maxMinGame.length === 2 && (
          <div>{`최고 점수: ${maxMinGame[0].score} / 최저 점수 : ${maxMinGame[1].score}`}</div>
        )}
      </div>
    </div>
  );
}
