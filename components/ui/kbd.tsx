import * as React from "react";

import { cn } from "@/lib/utils";

function Kbd({ className, children }: React.ComponentProps<"div">) {
  return (
    <kbd
      className={cn("", className)}
      style={{
        padding: "2px 6px",
        borderRadius: "4px",
        backgroundColor: "#f4f4f5",
        border: "1px solid #ccc",
        fontSize: "0.65rem",
        margin: "0 2px",
      }}
    >
      {children}
    </kbd>
  );
}

export { Kbd };
