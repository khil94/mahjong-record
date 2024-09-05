"use client";

import Link from "next/link";
import Dark from "../../public/Dark.svg";
import Light from "../../public/Light.svg";
import Home from "../../public/home.svg";
import Record from "../../public/record.svg";
import Records from "../../public/records.svg";
import ScoreTable from "../../public/score-table.svg";

import useTheme from "@/hooks/useTheme";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const { toggleTheme } = useTheme();
  const { theme } = useSelector((v: RootState) => v.theme);
  return (
    <aside
      className=" flex flex-col justify-center border-solid 
        items-center border-r-4 border-border p-4 
        fixed left-0 h-full w-20
        sm:hidden
        "
    >
      <div className="flex flex-col justify-start h-1/2 gap-12">
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
        <div className="hover:cursor-pointer" onClick={() => toggleTheme()}>
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
    </aside>
  );
}
