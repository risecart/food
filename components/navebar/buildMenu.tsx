"use client";
import LinkMenu from "./Link-menu";
import { useTranslation } from "react-i18next";

const BuildMenu = () => {
  const { t } = useTranslation();

  const links = [
    {
      text: t("home"),
      src: "/",
    },
    {
      text: t("categs"),
      src: "/categories",
    },
    {
      text: t("tracking_title"),
      src: "/tracking",
    },

    {
      text: t("exchange"),
      src: "/order-exchange",
    },

  ];

  return (
    <div className="flex md:flex-row flex-col gap-4 h-full m-auto w-fit">
      {links.map((x) => (
        <LinkMenu key={x.text} to={x.src}>
          {x.text}
        </LinkMenu>
      ))}
    </div>
  );
};

export default BuildMenu;
