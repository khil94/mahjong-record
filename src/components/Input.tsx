import { HTMLInputTypeAttribute } from "@/types/componentTypes";
import { useState } from "react";

interface IProp {
  onChange: (arg: any) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export default function Input({ onChange, placeholder, type }: IProp) {
  const [val, setVal] = useState<null | any>(null);

  return (
    <input
      className=" bg-bgSecondary rounded-md"
      placeholder={placeholder}
      value={val || ""}
      type={type}
      onChange={(e) => {
        setVal(e.target.value);
        onChange(val);
        console.log(
          "current val",
          val,
          typeof e.target.value,
          e.target.value,
          e.target.valueAsNumber
        );
      }}
    />
  );
}
