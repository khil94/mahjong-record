"use client";
import { changeTheme } from "@/lib/features/theme/themeSlice";
import { RootState } from "@/lib/store";
import { ITheme } from "@/types/dataTypes";
import { getCookie, setCookie } from "cookies-next";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useTheme = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((v: RootState) => v.theme);
  const setTheme = useCallback(
    (val: ITheme) => {
      document.documentElement.setAttribute("data-theme", val);
      dispatch(changeTheme(val));
      setCookie("theme", val);
    },
    [dispatch]
  );

  const initiateState = useCallback(() => {
    const cookieTheme = getCookie("theme");

    if (cookieTheme) {
      setTheme(cookieTheme as ITheme);
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : ("light" as ITheme);
      setTheme(systemTheme);
    }
  }, [setTheme]);

  const toggleTheme = useCallback(() => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [setTheme, theme]);

  useEffect(() => {
    initiateState();
  }, [setTheme]);

  return { toggleTheme };
};

export default useTheme;
