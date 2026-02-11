"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowLeft, ArrowRight, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import BuildMenu from "../navebar/buildMenu";
import { usePathname } from "next/navigation";

interface DrawerSidBarProps {
  className?: string;
}

export const DrawerSidBar = ({ className }: DrawerSidBarProps) => {
  const [direction, setDirection] = useState<string>("ltr");
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const dir = document.documentElement.getAttribute("dir");
    if (dir) setDirection(dir);
  }, []);

  useEffect(() => {
    setOpen(false)
  }, [pathname]);

  return (
    <div className={className}>
      <Drawer
        open={open}
        onOpenChange={(open) => setOpen(open)}
        autoFocus
        direction={direction == "ltr" ? "left" : "right"}
      >
        <DrawerTrigger
          asChild
          onClick={(e) => {
            (e.currentTarget as HTMLButtonElement).blur();
          }}
        >
          <Button
            aria-label="Close menu"
            variant={"ghost"}
            className="rounded-full hover:bg-accent ml-auto !p-2 "
          >
            <Menu className="!h-5 !w-auto  text-black " />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="!w-full sm:!w-[400px] !max-w-full">
          <DrawerHeader>
            <DrawerClose asChild className="w-full">
              <Button
                variant={"ghost"}
                className="rounded-full ltr:ml-auto rtl:mr-auto w-10 h-10"
              >
                {direction == "ltr" ? (
                  <ArrowLeft className="!w-5 !h-5" />
                ) : (
                  <ArrowRight className="!w-5 !h-5" />
                )}
              </Button>
            </DrawerClose>
            <DrawerTitle />
            <DrawerDescription />
          </DrawerHeader>
          <div className="w-fit p-4">
            <BuildMenu />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
