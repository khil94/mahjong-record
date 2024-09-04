"use client";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import UserDropdown from "@/components/UserDropdown";
import { UserRootState } from "@/lib/store";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [searchVal, setSearchVal] = useState("");
  const { loading } = useSelector((state: UserRootState) => state.users);

  return (
    <main className="flex flex-col items-start gap-16 w-full p-8 sm:pt-24">
      <h1 className=" font-bold text-5xl sm:text-2xl">
        누에단 마작 기록 사이트
      </h1>
      <div className="flex flex-row justify-center items-center w-1/2 md:w-full gap-4">
        {loading ? (
          <Loading size={24} />
        ) : (
          <>
            <UserDropdown
              customClass=" w-full "
              onChange={(val) => {
                setSearchVal(val);
              }}
              placeholder="사용자 선택"
            />
            <Link href={`/user/${searchVal}`}>
              <Button sizeType="sm" text="검색" />
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
