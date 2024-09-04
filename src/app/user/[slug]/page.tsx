import UserWrapper from "./components/UserWrapper";

interface IProp {
  params: { slug: string };
}

export default function UserDetail({ params }: IProp) {
  const targetId = decodeURIComponent(params.slug);

  return (
    <div
      className="w-full h-full gap-16 p-8 
                flex flex-col items-center 
                overflow-auto scrollbar-hide"
    >
      <UserWrapper id={targetId} />
    </div>
  );
}
