import { IGameRough } from "@/types/dataTypes";
import { umaClac } from "@/utils/globalFuncs";
import { useEffect, useState } from "react";
import Input from "./Input";
import UserDropdown from "./UserDropdown";
interface IProp {
  onChange: (data: IGameRough) => void;
}

export default function UserRecordData({ onChange }: IProp) {
  const [userData, setUserData] = useState<IGameRough>();

  useEffect(() => {
    if (userData) {
      onChange({ ...userData, uma: umaClac(userData.score) });
    }
  }, [userData]);

  return (
    <div className="flex flex-col gap-6">
      <UserDropdown
        placeholder="사용자 선택"
        onChange={(v) => {
          setUserData({ ...userData, userName: v });
        }}
      />
      <Input
        onChange={(e) => {
          if (!isNaN(e)) {
            setUserData({ ...userData, score: e });
          }
        }}
        required
        type={"text"}
        placeholder="점수 입력"
        inputMode="numeric"
      />
    </div>
  );
}
