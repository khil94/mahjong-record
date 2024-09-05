import { IUser } from "@/types/dataTypes";
import { paintRank } from "@/utils/globalFuncs";

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

  const UserRankDataComp = ({
    rank,
    rankData,
  }: {
    rank: number;
    rankData: IRankData;
  }) => {
    return (
      <div
        className={` border-2 border-solid pt-2 pb-2 break-keep text-center ${paintRank(
          rank
        )}`}
      >
        <div className="font-bold">{`${rank}위`}</div>
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
      <div className="border-2 border-solid p-4 text-center">
        <div>{`총 게임 횟수 : ${target.history.length}회`}</div>
        <div>{`현재 우마 : ${target.currentUma}점`}</div>
        <div>{`평균 획득 우마 : ${(
          target.currentUma / target.history.length
        ).toFixed(1)}점`}</div>
        <div>{`평균 획득 점수 : ${(
          getRankData().reduce((p, c) => p + c.totalScore, 0) /
          target.history.length
        ).toFixed(1)}점`}</div>
      </div>
    </div>
  );
}
