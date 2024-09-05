"use client";
import { useAppDispatch } from "@/hooks/userAppDispatch";
import { fetchUsers } from "@/lib/features/users/usersSlice";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";

export default function Fetcher() {
  const dispatch = useAppDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return <></>;
}
