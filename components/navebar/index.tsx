// components/navbar/NavBar.tsx
import React from "react";
import Container from "../Container";
import { Logo } from "./logo";
import { LangSelect } from "./langSelect";
import BuildMenu from "./buildMenu";
import { DrawerSidBar } from "../sidebar/drawer-sidbar";
import CartViewDrawer from "../card/CartViewDrawer";
import { IconSerch } from "./iconSerch";
import { CartFavorite } from "./cartFavorite";

export const NavBar = () => {
  return (
    <div id="NavBar" className="w-full sticky top-0 z-40 bg-white shadow-sm">
      <Container className="max-w-7xl flex items-center gap-2 h-14">
        {/* Sidebar for mobile */}
        <div className="w-10 h-10 md:hidden flex items-center justify-center">
          <DrawerSidBar />
        </div>

        {/* Logo */}
        <div className="flex items-center h-full">
          <Logo />
        </div>

        {/* Menu for desktop */}
        <div className="w-fit h-full hidden md:block">
          <BuildMenu />
        </div>

        {/* Right section */}
        <div className="grow flex items-center justify-end gap-2 ltr:ml-auto rtl:mr-auto min-w-[180px] h-full">
          <div className="w-10 h-10 flex items-center justify-center">
            <IconSerch />
          </div>
          <div className="w-10 h-10 flex items-center justify-center">
            <CartFavorite />
          </div>
          <div className="min-w-10 h-10 flex items-center justify-center">
            <CartViewDrawer />
          </div>
          <div className="w-10 h-10 flex items-center justify-center">
            <LangSelect />
          </div>
        </div>
      </Container>
    </div>
  );
};
