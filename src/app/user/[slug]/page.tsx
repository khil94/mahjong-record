import UserWrapper from "./components/UserWrapper";

interface IProp {
  params: { slug: string };
}

export default function UserDetail({ params }: IProp) {
  const targetId = decodeURIComponent(params.slug);

  return (
    <div
      className="w-full h-full gap-16 bg-bgPrimary
                flex flex-col items-center sm:pt-24
                overflow-auto scrollbar-hide"
    >
      <UserWrapper id={targetId} />
    </div>
  );
}
