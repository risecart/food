"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { MdRemove } from "react-icons/md";
import { Button } from "./ui/button";
import Currency from "./Currency";
import getImages from "@/lib/getImages";

type AddonProps = {
  isActive: boolean;
  onInc: (e: any) => void;
  onDec: (e: any) => void;
  onClick: (e: any) => void;
  data: AddonSubQte;
};
export default function Addons({
  isActive,
  onInc,
  onDec,
  onClick,
  data,
}: AddonProps) {
  return (
    <div
      className={`pt-[100%] w-full  relative border 
        ${isActive ? "border-primary shadow-md" : ""} 
        ${data.price == 0 ? "!pt-0" : ""}
        rounded-lg overflow-hidden `}
    >
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 transition-bg duration-300 
            ${isActive ? "bg-primary text-white" : "bg-gray-100"} flex flex-col
            ${data.price == 0 ? "!relative py-1 h-full text-center " : ""}`}
            style={{
              
            }}
      >
        <div className="absolute inset-0  bg-contain bg-left bg-no-repeat opacity-15"
        style={{
          backgroundImage:`url(${getImages(data.image)})`
        }}>

        </div>
        <div
          className={`flex text-sm relative items-center cursor-pointer justify-center grow flex-col`}
          onClick={onClick}
        >
          <span className=" font-semibold text-sm capitalize">
            {data.value}
          </span>
          {!!data.price && (
            <span>
              {data.price * data.qte} <Currency />
            </span>
          )}
        </div>
        {data.price > 0 && (
          <div
            className={`flex relative ${
              isActive ? "text-black" : "-mb-8"
            } transition-all items-center p-1 justify-between m-1 bg-white shadow overflow-hidden rounded-full`}
          >
            <Button
              variant="default"
              size="sm"
              className="text-md w-6 h-6  bg-accent shadow text-black  hover:bg-primary hover:text-white rounded-full"
              onClick={onDec}
            >
              <MdRemove />
            </Button>
            <span className="grow  text-md text-center">{data?.qte}</span>
            <Button
              variant="default"
              size="sm"
              className="text-md  w-6 h-6  bg-accent text-black  hover:bg-primary hover:text-white rounded-full"
              onClick={onInc}
            >
              <AiOutlinePlus />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
