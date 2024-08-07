import Button from "@/components/Button";
import { IGameDetail, IPostGameData } from "@/types/dataTypes";

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
  function UserDataComp({ userData }: { userData: IGameDetail }) {
    return (
      <tr className="w-full bg-red-300 ">
        <td>{userData.rank}</td>
        <td>{userData.userName}</td>
        <td>{userData.score}</td>
        <td>{userData.uma}</td>
      </tr>
    );
  }

  return (
    <div
      className={`${visibleProp[visible]} flex justify-center items-center flex-col w-full`}
    >
      <table className=" text-center">
        <thead>
          <tr className="[&_th]:p-4">
            <th>순위</th>
            <th>이름</th>
            <th>점수</th>
            <th>우마</th>
          </tr>
        </thead>
        <tbody className="[&_td]:p-4 [&_td]:px-8">
          {data !== undefined &&
            data.detail.map((v) => {
              return <UserDataComp userData={v} key={v.userName + v.uma} />;
            })}
        </tbody>
      </table>
      <Button
        colorType={"border"}
        onClick={onCancel}
        text={`우마는 ${umaSum}`}
      />
    </div>
  );
}
