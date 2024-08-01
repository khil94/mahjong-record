"use client";

import Navbar from "./Navbar";

export default function GlobalLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div
      className={` bg-bgPrimary text-text min-h-lvh flex flex-col items-center`}
    >
      <Navbar />
      {children}
    </div>
  );
}
