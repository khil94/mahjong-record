import Image from "next/image";

interface IProp {
  size: number;
}

export default function Loading({ size }: IProp) {
  return (
    <Image
      src="/spinner.svg"
      width={size}
      height={0}
      style={{ height: "auto" }}
      alt="loading"
    />
  );
}
