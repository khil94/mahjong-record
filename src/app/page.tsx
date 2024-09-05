"use client";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import UserDropdown from "@/components/UserDropdown";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import Jung from "../../public/jung.svg";

export default function Home() {
  const [searchVal, setSearchVal] = useState("");
  const { loading } = useSelector((state: RootState) => state.users);

  return (
    <main className="relative sm:pt-24 p-8 w-full flex justify-center items-center">
      <div className="">
        <Jung stroke={"var(--color-border)"} width={300} height={300} />
      </div>
      <div className="md:p-4 -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 flex flex-col items-center gap-16 w-full z-10 bg-transparent">
        <h1 className=" font-bold text-5xl sm:text-2xl">마작.gg for 누에단</h1>
        <div className="flex flex-row justify-center items-center w-1/2 md:w-full gap-4">
          {loading ? (
            <Loading size={40} />
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
      </div>
    </main>
  );
}
