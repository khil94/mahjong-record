import Image from "next/image";

export default function ScoreTablePage() {
  return (
    <div className="w-full h-full gap-4 p-4 flex flex-col justify-start items-center md:pt-24">
      <h1 className="text-3xl font-bold">점수표</h1>
      <Image
        width={600}
        height={0}
        style={{ height: "auto" }}
        alt="score-table"
        src="/score-table.png"
        priority
      />
    </div>
  );
}
