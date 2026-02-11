"use client";

import Image from "next/image";
import Link from "next/link";
import getImages from "@/lib/getImages";

export default function CategoryCard({ data }: { data: Category }) {
  return (
    <div className="relative m-2 overflow-hidden rounded-lg border shadow-lg shadow-gray-100 group cursor-pointer">
      <Link href={`/categories/${data.id}`}>
        {/* Maintain 4:5 aspect ratio */}
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={getImages(data.image)}
            alt={data.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-all duration-300 group-hover:scale-105"
            loading="lazy"
            placeholder="empty"
          />
          {/* Gradient Overlay with Title */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 p-3 group-hover:from-black/10 group-hover:to-black/80 flex flex-col">
            <div className="grow" />
            <h1 className="text-xl font-bold text-white origin-bottom-left rtl:origin-bottom-right transition-all duration-300">
              {data.name}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
}
