"use client";

import Link from "next/link";
import Dark from "../../public/Dark.svg";
import Light from "../../public/Light.svg";
import BurgerBar from "../../public/burger-bar.svg";
import Home from "../../public/home.svg";
import Record from "../../public/record.svg";
import Records from "../../public/records.svg";
import ScoreTable from "../../public/score-table.svg";

import useTheme from "@/hooks/useTheme";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme } = useTheme();
  const { theme } = useSelector((v: RootState) => v.theme);

  return (
    <div
      className={`${
        isOpen ? "" : "border-b "
      } hidden w-full sm:flex fixed left-0 border-solid border-border h-20 z-10`}
    >
      <div className="backdrop-blur-lg w-full p-4 flex justify-end items-center ">
        <div onClick={() => setIsOpen(!isOpen)}>
          <BurgerBar
            width={50}
            height={50}
            stroke="var(--color-text)"
            fill="var(--color-text)"
          />
        </div>
      </div>
      <div
        className={`${
          isOpen ? `flex` : "hidden"
        } absolute  top-[79px] right-0 p-4 w-full
          backdrop-blur-lg
          border-solid border-b border-border`}
      >
        <div
          className="flex w-full flex-col gap-8  items-end "
          onClick={() => setIsOpen(false)}
        >
          <Link href={"/"}>
            <Home width={50} height={50} stroke="var(--color-text)" />
          </Link>
          <Link href={"/record"}>
            <Record
              width={50}
              height={50}
              fill="var(--color-text)"
              stroke="var(--color-text)"
            />
          </Link>
          <Link href={"/records"}>
            <Records
              width={50}
              height={50}
              stroke="var(--color-text)"
              fill="var(--color-text)"
            />
          </Link>
          <Link href={"/score-table"}>
            <ScoreTable
              width={50}
              height={50}
              stroke="var(--color-text)"
              fill="var(--color-text)"
            />
          </Link>
          <div onClick={() => toggleTheme()}>
            {theme === "light" ? (
              <Dark
                width={50}
                height={50}
                stroke="var(--color-text)"
                fill="var(--color-background-primary)"
              />
            ) : (
              <Light
                width={50}
                height={50}
                stroke="var(--color-text)"
                fill="var(--color-text)"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
