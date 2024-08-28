"use client";
import { getUserData } from "@/api/firebase";
import { IUser } from "@/types/dataTypes";
import { useEffect, useState } from "react";

interface IProp extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onChange: (v: any) => void;
  placeholder?: string;
}

export default function UserDropdown({
  onChange,
  placeholder,
  ...rest
}: IProp) {
  const [userData, setUserData] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const resp = await getUserData();
      const temp: IUser[] = [];
      resp.forEach((v) => {
        temp.push(v.data());
      });
      setUserData(temp.sort((a, b) => a.name.localeCompare(b.name)));
    };
    getUsers();
  }, []);

  return (
    <select
      {...rest}
      required
      className=" bg-bgSecondary p-2 pr-6 rounded-md invalid:text-gray-300"
      onChange={(e) => {
        onChange(e.target.value);
      }}
      defaultValue={""}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {userData.map((v, i) => (
        <option key={v.id} value={v.name}>
          {v.name}
        </option>
      ))}
    </select>
  );
}
