import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export default function Container({ className = "", children, ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={clsx(
        "mx-auto container  px-0 max-w-[1200px] max-md:max-w-[980px]",
        className
      )}
    >
      {children}
    </div>
  );
}