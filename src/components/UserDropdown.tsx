"use client";
import { UserRootState } from "@/lib/store";
import { useSelector } from "react-redux";

interface IProp extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onChange: (v: any) => void;
  placeholder?: string;
  customClass?: string;
}

export default function UserDropdown({
  onChange,
  placeholder,
  customClass,
  ...rest
}: IProp) {
  const userData = useSelector((state: UserRootState) => state.users.users);

  return (
    <select
      {...rest}
      required
      className={`${customClass} bg-bgSecondary p-2 pr-6 rounded-md invalid:text-gray-300`}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      defaultValue={""}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {userData.map((v, i) => (
        <option key={v.id} value={v.id}>
          {v.name}
        </option>
      ))}
    </select>
  );
}
