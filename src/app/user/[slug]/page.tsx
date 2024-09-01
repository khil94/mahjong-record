import History from "./components/History";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
interface IProp {
  params: { slug: string };
}

export default function UserDetail({ params }: IProp) {
  const target = decodeURIComponent(params.slug);

  return (
    <div className="w-full h-full gap-16 p-8 flex flex-col items-center overflow-auto scrollbar-hide">
      <h1 className="text-3xl font-bold">{`${target}의 상세 정보`}</h1>
      <div className="flex min-h-[50%] h-1/2 w-full md:h-full [&_div]:flex-grow md:flex-col">
        <PieChart name={target} />
        <LineChart name={target} />
      </div>
      <div className=" w-4/5 sm:w-full">
        <h2>경기 내역</h2>
        <History name={target} />
      </div>
    </div>
  );
}
