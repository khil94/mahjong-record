import GlobalLayout from "@/containers/GlobalLayout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import UserStoreProvider from "./UserStoreProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "누에단 마작 기록 웹",
  description: "누에단 녀석들 마작 기록용 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <UserStoreProvider>
          <GlobalLayout>{children}</GlobalLayout>
        </UserStoreProvider>
      </body>
    </html>
  );
}
