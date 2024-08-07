const btnColorList = {
  main: {
    bgColor: "bg-main",
    disabled: "disabled:bg-border",
  },
  border: {
    bgColor: "bg-border",
    disabled: "disabled:bg-bgSecondary",
  },
};

interface IProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  colorType: keyof typeof btnColorList;
}

export default function Button({ text, colorType, ...rest }: IProp) {
  return (
    <button
      {...rest}
      className={` w-full ${btnColorList[colorType].bgColor} ${btnColorList[colorType].disabled} p-3 rounded-md`}
    >
      {text}
    </button>
  );
}
