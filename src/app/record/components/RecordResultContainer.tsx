import Button from "@/components/Button";
import { IGameDetail, IPostGameData } from "@/types/dataTypes";
import { useMemo } from "react";
interface IProp {
  onCancel: () => void;
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
  umaSum,
  data,
  visible,
}: IProp) {
  function checkDup() {
    if (data?.detail) {
      const temp = new Set(data.detail.map((v) => v.userName));
      return temp.size !== 4;
    }
    return false;
  }

  const userDup = useMemo(() => {
    return checkDup();
  }, [data]);

  function UserDataComp({ userData }: { userData: IGameDetail }) {
    return (
      <tr className="w-full bg-border">
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
      <table className="overflow-x-scroll text-center min-w-[40%] ">
        <colgroup>
          <col width={"20%"} />
          <col width={"30%"} />
          <col width={"30%"} />
          <col width={"20%"} />
        </colgroup>

        <thead className="bg-bgSecondary">
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
          <Button
            sizeType="sm"
            colorType={"border"}
            onClick={onCancel}
            text={`뒤로가기`}
          />
          <Button
            sizeType="sm"
            colorType={"main"}
            disabled={umaSum !== 0 || userDup}
            onClick={onCancel}
            text={"제출"}
          />
        </div>
      </div>
    </div>
  );
}
