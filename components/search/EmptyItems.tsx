"use client";

import { useTranslation } from "react-i18next";
import { TbShoppingBagSearch } from "react-icons/tb";

export default function EmptyItems({
  iconClassName = "",
  children,
}: {
  iconClassName?: string;
  children?: React.ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center flex-col text-gray-400 mt-4 mb-5">
      <TbShoppingBagSearch  className={"text-6xl " + iconClassName} />
      {children ?? (
        <h1 className="font-bold">{t("empty_serch")}</h1>
      )}
    </div>
  );
}
