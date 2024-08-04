import { useState } from "react";

interface IProp
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChange: (arg: any) => void;
}

export default function Input({ onChange, ...rest }: IProp) {
  const [val, setVal] = useState<null | any>(null);

  return (
    <input
      className=" bg-bgSecondary rounded-md p-2 w-full"
      value={val || ""}
      onChange={(e) => {
        setVal(e.target.value);
        onChange(e.target.value);
      }}
      {...rest}
    />
  );
}
