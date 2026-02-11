import { useRef, useState } from "react";

import { MdDelete } from "react-icons/md";

import { FaImage } from "react-icons/fa";
import { LoadingSpinner } from "./ui/loading-spinner";
import getImages from "@/lib/getImages";
import { Button } from "./ui/button";
import uploadService from "@/services/upload.service";
type PropsType = {
  imgSrc?: string | null;
  className?: string;
  error?: string | null;
  setData: (e: string) => void;
};
const UploadImageSingle = ({
  imgSrc,
  setData,
  className = "",
  error,
}: PropsType) => {
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { isPending, mutateAsync } = uploadService.useUploadImages();
  const handleFileChange = async (e: any) => {
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    mutateAsync({
      images: files,
    }).then((res) => setData(res));
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    dropzoneRef.current?.classList.add("border-primary");
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    dropzoneRef.current?.classList.remove("border-primary");
  };

  const handleDrop = async (e: any) => {
    e.preventDefault();
    dropzoneRef.current?.classList.remove("border-primary");
    const files = Array.from(e.dataTransfer?.files || []);
    mutateAsync({
      images: files as File[],
    }).then((res) => setData(res));
  };

  return (
    <div
      className={`w-full overflow-hidden flex relative cursor-pointer  items-center 
                justify-center hover:border-primary border-2 border-gray-300/50 
                border-dashed rounded-lg p-6 ${className} ${
        !!error ? "!border-red-600" : ""
      }`}
      id="dropzone"
      ref={dropzoneRef}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
        ref={inputFileRef}
        onChange={handleFileChange}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />
      {!!!imgSrc && (
        <div className="text-center flex flex-col items-center justify-center cursor-pointer">
          {isPending ? (
            <LoadingSpinner className="h-12 w-12" />
          ) : (
            <FaImage className="mx-auto h-12 w-12 opacity-50" />
          )}
          <h3 className="mt-2 text-sm font-medium opacity-50">
            <label htmlFor="file-upload" className="relative cursor-pointer">
              <span>Drag and drop</span>
              <span className="text-primary"> or browse</span>
              <span> to upload</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                ref={inputFileRef}
                multiple
              />
            </label>
          </h3>
          <p className="mt-1 text-xs opacity-50">(PNG, JPG, GIF) max 5MB </p>
        </div>
      )}

      {!!imgSrc && (
        <div
          className="absolute  inset-0 bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('" + getImages(imgSrc, true) + "')",
          }}
        >
          <Button
            size="sm"
            color="danger"
            className="absolute  top-4 right-4 z-[60]"
            onClick={() => {
              setData("");
            }}
          >
            <MdDelete className="w-5 h-5" />
          </Button>
        </div>
      )}
      {isPending && (
        <div role="status" className="animate-pulse absolute inset-0">
          <div className="w-full h-full bg-gray-200  rounded-none dark:bg-gray-700 opacity-25 "></div>
        </div>
      )}
    </div>
  );
};

export default UploadImageSingle;
