import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { RankPainter } from "@/constants/styles";
import { IGameDetail, IPostGameData } from "@/types/dataTypes";
import { useMemo, useState } from "react";
interface IProp {
  onCancel: () => void;
  onSubmit: (data: IPostGameData) => Promise<void>;
  umaSum: number;
  data: IPostGameData;
  visible?: keyof typeof visibleProp;
}
const visibleProp = {
  visible: "visible",
  hidden: "hidden",
};

export default function RecordResultContainer({
  onCancel,
  onSubmit,
  umaSum,
  data,
  visible,
}: IProp) {
  const [postLoading, setPostLoading] = useState(false);
  const userDup = useMemo(() => {
    if (data?.detail) {
      const temp = new Set(data.detail.map((v) => v.userName));
      return temp.size !== 4;
    }
    return false;
  }, [data]);

  function UserDataComp({ userData }: { userData: IGameDetail }) {
    return (
      <tr
        className={`${userData.rank === 1 && "font-bold"} ${
          userData.rank !== 2 &&
          userData.rank !== 3 &&
          `${RankPainter.textColor[userData.rank]} ${
            RankPainter.borderColor[userData.rank]
          }`
        } w-full bg-border`}
      >
        <td>{userData.rank}</td>
        <td>{userData.userName}</td>
        <td>{userData.score}</td>
        <td>{userData.uma}</td>
      </tr>
    );
  }

  return (
    <div
      className={`${visibleProp[visible]} w-full flex justify-center items-center flex-col gap-8 `}
    >
      <h1>입력 결과</h1>
      <table className="overflow-x-scroll text-center min-w-[40%] table-auto whitespace-nowrap [&_td]:align-middle">
        <thead className=" bg-main text-white">
          <tr className="[&_th]:p-2 ">
            <th>순위</th>
            <th>이름</th>
            <th>점수</th>
            <th>우마</th>
          </tr>
        </thead>
        <tbody className="[&_td]:p-4">
          {data !== undefined &&
            data.detail.map((v) => {
              return <UserDataComp userData={v} key={v.userName + v.uma} />;
            })}
        </tbody>
      </table>
      <div className="flex flex-col justify-center items-center gap-8">
        <span>{`우마는 ${umaSum}`}</span>
        {umaSum !== 0 && <span>우마를 확인해주세요.</span>}
        {userDup && <span>사용자를 확인해주세요.</span>}
        <div className="flex flex-row gap-8">
          {postLoading ? (
            <Loading size={50} />
          ) : (
            <>
              <Button
                sizeType="sm"
                colorType={"border"}
                onClick={onCancel}
                text={`뒤로가기`}
              />
              <Button
                sizeType="sm"
                colorType={"main"}
                customClass="text-white"
                disabled={umaSum !== 0 || userDup}
                onClick={async () => {
                  setPostLoading(true);
                  await onSubmit(data);
                  onCancel();
                  setPostLoading(false);
                }}
                text={"제출"}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
