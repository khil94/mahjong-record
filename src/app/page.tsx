"use client";

import Button from "@/components/Button";
import UserDropdown from "@/components/UserDropdown";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [searchVal, setSearchVal] = useState("");

  return (
    <main className="flex flex-col items-center justify-between w-full p-8">
      <div className="flex flex-row w-1/2 md:w-full gap-4">
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
      </div>
    </main>
  );
}
