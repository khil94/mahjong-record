import GlobalLayout from "@/containers/GlobalLayout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import UserStoreProvider from "./UserStoreProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "누에단 마작 기록 웹",
  description: "누에단 녀석들 마작 기록용 웹사이트",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  function initTheme() {
    const cookieTheme = cookies().get("theme");
    if (cookieTheme) {
      return cookieTheme.value;
    } else {
      return "";
    }
  }
  const theme = initTheme();

  return (
    <html data-theme={theme} lang="ko">
      <body className={inter.className}>
        <UserStoreProvider>
          <GlobalLayout>{children}</GlobalLayout>
        </UserStoreProvider>
      </body>
    </html>
  );
}
