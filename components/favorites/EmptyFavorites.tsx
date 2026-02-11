"use client";

import { useTranslation } from "react-i18next";
import { RiDislikeFill } from "react-icons/ri";


export default function EmptyFavorites({
  iconClassName = "",
  children,
}: {
  iconClassName?: string;
  children?: React.ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center flex-col text-gray-400 mt-4 mb-5">
      <RiDislikeFill   className={"text-6xl " + iconClassName} />
      {children ?? (
        <h1 className="font-bold">{t("fav_empty")}</h1>
      )}
    </div>
  );
}
