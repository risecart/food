"use client";
import { useAppDispatch } from "@/store/hooks";
import { updateSetting } from "@/store/slices/themeSlice";
import { useEffect } from "react";

export default function ThemeInitializer(theme: ThemeSetting) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (theme?.theme) {
      dispatch(updateSetting(theme));
    }
  }, [theme]);

  return null;
}
