"use client";
import { useEffect } from "react";

export default function ThemeScript() {
  useEffect(() => {
    try {
      const theme = localStorage.getItem("theme");
      if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
      }
    } catch {}
  }, []);
  return null;
}
