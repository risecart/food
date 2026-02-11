import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

interface InputProps extends React.ComponentProps<"input"> {
  lable?: string;
  prefixElement?: React.JSX.Element | null;
  suffix?: React.JSX.Element | null;
  classNameInput?: string;
  classNamelable?: string;
}

interface InputGeneralProps extends React.ComponentProps<"input"> {
  lable?: string;
  prefixElement?: React.JSX.Element | null;
  suffix?: React.JSX.Element | null;
  classNameInput?: string;
  classNamelable?: string;
  error?: string;
}

function Input({
  className,
  type,
  prefixElement,
  suffix,
  classNameInput,
  classNamelable,
  lable,
  ...props
}: InputProps) {
  return (
    <div className={cn("", className)}>
      {lable && <Label htmlFor={props.id}>{lable}</Label>}
      <div className={cn("flex flex-row gap-2 items-center", classNameInput)}>
        <div className="w-fit">{prefixElement}</div>
        <input
          type={type}
          className=" grow !ring-0 outline-0 !p-0 !m-0"
          data-slot="input"
          {...props}
        />
        <div className="w-fit">{suffix}</div>
      </div>
    </div>
  );
}

function InputGeneral({
  className,
  type,
  prefixElement,
  suffix,
  classNameInput,
  classNamelable,
  lable,
  error,
  ...props
}: InputGeneralProps) {
  return (
    <div className="flex flex-col">
      <div className={cn("", className)}>
        {lable && (
          <Label className="pb-2" htmlFor={props.id}>
            {lable}
          </Label>
        )}
        <div className={cn("flex flex-row gap-2 items-center")}>
          {prefixElement && <div className="w-fit">{prefixElement}</div>}
          <input
            type={type}
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              error && "border-rose-500 ",
              classNameInput
            )}
            data-slot="input"
            {...props}
          />
          {suffix && <div className="w-fit">{suffix}</div>}
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mx-2  mt-1">{error}</p>}
    </div>
  );
}

export { Input, InputGeneral };
