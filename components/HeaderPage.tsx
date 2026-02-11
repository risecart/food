"use client";

import { useTranslation } from "react-i18next";

interface HeaderPageProps {
  titel: string;
}
export default function HeaderPage({ titel }: HeaderPageProps) {
  const { t } = useTranslation();
  return (
    <div className="h-52 mt-0 mb-5 rounded-none bg-gradient-to-b from-accent to-white from-50% to-100% shadow-none border-none flex items-center justify-center">
      <h2 className="capitalize font-semibold text-3xl text-center">
        {t(titel)}
      </h2>
    </div>
  );
}
