"use client";

import Link from "next/link";
import BurgerBar from "../../public/burger-bar.svg";
import Home from "../../public/home.svg";
import Record from "../../public/record.svg";
import Records from "../../public/records.svg";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="hidden sm:w-full sm:flex justify-end 
    items-center bg-transparent
    sticky top-0 left-0 backdrop-blur-lg
    border-solid border-b border-border
    p-4"
    >
      <div onClick={() => setIsOpen(!isOpen)}>
        <BurgerBar width={40} height={40} />
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className={`${
          isOpen ? `flex` : "hidden"
        } absolute flex-col gap-8  w-full top-0 right-0 p-4 items-end bg-bgPrimary border-solid border-b border-border`}
      >
        <div className="" onClick={() => setIsOpen(!isOpen)}>
          <BurgerBar width={40} height={40} />
        </div>
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
    </div>
  );
}
