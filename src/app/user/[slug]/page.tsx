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
      <div className="flex [&_div]:flex-auto min-h-[50%] md:min-h-fit w-full md:grid md:col-span-1 md:row-span-2">
        <PieChart name={target} />
        <LineChart name={target} />
      </div>
      <div className=" w-4/5 sm:w-full">
        <h2 className="text-2xl font-bold mb-8">대전 기록</h2>
        <History name={target} />
      </div>
    </div>
  );
}
