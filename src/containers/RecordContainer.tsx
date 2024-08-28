import Button from "@/components/Button";
import UserRecordData from "@/components/UserRecordData";
import { IGameRough, IUserPositionData } from "@/types/dataTypes";
import Image from "next/image";
import { useState } from "react";

type IKeys = keyof IUserPositionData;

interface IProp {
  handleSubmit: (data: IUserPositionData) => void;
  visible?: keyof typeof visibleProp;
}

const visibleProp = {
  visible: "visible",
  hidden: "hidden",
};

export default function RecordContainer({ handleSubmit, visible }: IProp) {
  const [userDataList, setUserDataList] = useState<IUserPositionData>();

  function handleUserRecordData(data: IGameRough, position: IKeys) {
    setUserDataList({ ...userDataList, [position]: { ...data } });
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(userDataList);
      }}
      className={`${visibleProp[visible]} flex flex-col justify-center items-center gap-4`}
    >
      <span className="mb-8">첫 친을 동가에 배치해주세요.</span>
      <UserRecordData onChange={(d) => handleUserRecordData(d, "north")} />
      <div className="flex flex-row  justify-center items-center gap-4">
        <UserRecordData onChange={(d) => handleUserRecordData(d, "west")} />

        <Image
          priority
          className=" sm:hidden"
          src={"/table.png"}
          alt="table"
          width={240}
          height={240}
        />
        <UserRecordData onChange={(d) => handleUserRecordData(d, "east")} />
      </div>
      <UserRecordData onChange={(d) => handleUserRecordData(d, "south")} />
      <div className="w-24">
        <Button colorType="main" text="제출" type="submit" />
      </div>
    </form>
  );
}
