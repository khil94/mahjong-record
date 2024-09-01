"use client";
import userStore from "@/lib/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function UserStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<typeof userStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = userStore;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
