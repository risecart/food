"use client";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import styled from "styled-components";

interface ButtonLodingMoreSlideProps {
  src?: string;
  data?: Button | null;
}

const ButtonStyle = styled.button<{ $styles?: Button | null }>`
  background-color: ${(props) => props.$styles?.backgroundColor};
  color: ${(props) => props.$styles?.color};
  border: 1px solid ${(props) => props.$styles?.borderColor};
  text-align: center;
  text-align: -webkit-center;
  border-radius: 9999px;
  &:hover {
    background-color: ${(props) => props.$styles?.backgroundHover};
    border-color: ${(props) => props.$styles?.borderColorHover};
    color: ${(props) => props.$styles?.titleHover};
  }
  font-size: ${(props) => props.$styles?.fontSize};
`;

export const ButtonLodingMoreSlide = ({
  src,
  data,
}: ButtonLodingMoreSlideProps) => {
  const { t, i18n } = useTranslation();
  return (
    <Link
      className="flex flex-col  m-auto items-center justify-center "
      href={src ? src : "/categories/"}>
      <ButtonStyle aria-label="See more" $styles={data}>
        <IoIosArrowRoundForward
          className={"w-8 h-8 " + (i18n.language == "ar" ? "rotate-180" : "")}
        />
      </ButtonStyle>
      <span className="font-medium mt-2">{t("showMore")}</span>
    </Link>
  );
};
