import { IUser } from "@/types/dataTypes";

interface IProp {
  userData: IUser[];
}
export default function RankDataChart({ userData }: IProp) {
  const rankData = userData.sort((a, b) => b.currentUma - a.currentUma);

  function UserDataComp({ userData, rank }: { rank: number; userData: IUser }) {
    const rankObj = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    };
    userData.history.forEach((v) => rankObj[v.rank]++);
    return (
      <tr className="w-full bg-border">
        <td>{rank}</td>
        <td>{userData.name}</td>
        <td>{userData.currentUma}</td>
        <td>{(userData.currentUma / userData.history.length).toFixed(1)}</td>
        <td>{userData.history.length}</td>
        <td>{rankObj[1]}</td>
        <td>{rankObj[2]}</td>
        <td>{rankObj[3]}</td>
        <td>{rankObj[4]}</td>
      </tr>
    );
  }

  return (
    <div className="overflow-x-scroll">
      <table className=" text-center min-w-[40%] table-auto whitespace-nowrap">
        <thead className="bg-bgSecondary">
          <tr className="[&_th]:p-2 ">
            <th>순위</th>
            <th>이름</th>
            <th>우마</th>
            <th>평우마</th>
            <th>게임수</th>
            <th>1위</th>
            <th>2위</th>
            <th>3위</th>
            <th>4위</th>
          </tr>
        </thead>
        <tbody className="[&_td]:p-4">
          {rankData !== undefined &&
            rankData.map((v, i) => {
              return <UserDataComp userData={v} rank={i + 1} key={v.id} />;
            })}
        </tbody>
      </table>
    </div>
  );
}
