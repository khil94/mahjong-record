const btnColorList = {
  main: {
    bgColor: "bg-main",
    disabled: "disabled:bg-border",
  },
  border: {
    bgColor: "bg-border",
    disabled: "disabled:bg-bgSecondary",
  },
} as const;

const btnSizeList = {
  default: "w-full",
  lg: "w-72",
  md: "w-40",
  sm: "w-24",
} as const;

interface IProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  colorType?: keyof typeof btnColorList;
  sizeType?: keyof typeof btnSizeList;
}

export default function Button({
  text,
  colorType = "main",
  sizeType = "default",
  ...rest
}: IProp) {
  return (
    <button
      {...rest}
      className={`${btnSizeList[sizeType]} ${btnColorList[colorType].bgColor} ${btnColorList[colorType].disabled} p-3 rounded-md`}
    >
      {text}
    </button>
  );
}
