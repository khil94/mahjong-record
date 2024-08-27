"use client";

import Link from "next/link";
import { useState } from "react";
import Home from "../../public/home.svg";
import Record from "../../public/record.svg";
import Records from "../../public/records.svg";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <aside
      className=" flex flex-col justify-center border-solid 
        items-center border-r-4 border-border p-4 
        fixed left-0 h-lvh w-20
        sm:hidden
        "
    >
      <div className="flex flex-col justify-start h-1/2 gap-12">
        <Link href={"/"}>
          <Home width={50} height={50} />
        </Link>
        <Link href={"/record"}>
          <Record width={50} height={50} />
        </Link>
        <Link href={"/records"}>
          <Records width={50} height={50} />
        </Link>
      </div>
    </aside>
  );
}
