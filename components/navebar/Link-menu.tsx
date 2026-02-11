"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode, MouseEventHandler } from "react";

interface LinkSSProps {
  to: string;
  onClick?: MouseEventHandler;
  children: ReactNode;
  className?: string;
}

export default function LinkMenu({
  to,
  children,
  onClick = () => {},
  className = "",
}: LinkSSProps) {
  const pathname = usePathname();

  const active =
    pathname === "/"
      ? to === "/"
      : to !== "/"
      ? pathname.startsWith(to)
      : false;

  return (
    <Link
      
      href={to}
      onClick={onClick}
      className={`h-full uppercase flex items-center text-sm relative font-medium group ${className} ${
        active ? "after:scale-x-100" : ""
      }`}
    >
      {children}
      <div
        className={`absolute bottom-0 transition-all right-0 left-0 scale-x-0 group-hover:scale-x-100 h-[2px] bg-primary ${
          active ? "scale-x-100" : ""
        }`}
      ></div>
    </Link>
  );
}
