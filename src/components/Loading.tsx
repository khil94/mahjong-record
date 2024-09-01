interface IProp {
  size: number;
}

export default function Loading({ size }: IProp) {
  return <img src="/spinner.svg" width={size} />;
}
