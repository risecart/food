"use client";
import { Fragment, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"; // حسب مسارك
import { Badge } from "@/components/ui/badge"; // حسب مسارك
import getImages from "@/lib/getImages";
import Image from "next/image";

export default function CategoryItems({
  data,
  etag = 0,
  link = ["/categories"],
}: {
  data: Category[];
  etag?: number;
  link?: string[];
}) {
  const [ActiveItem, setActiveItem] = useState<Category>();
  const pathname = usePathname();

  useEffect(() => {
    const ar = pathname
      .replaceAll("en/", "")
      .replaceAll("fr/", "")
      .split("/")
      .slice(2);
    data.forEach((el) => {
      const isActive = ar.length ? Number(ar[etag]) === el.id : false;
      if (isActive) {
        setTimeout(() => {}, 100);
      }
    });
  }, [pathname, data, etag]);

  const idArray = useMemo(() => {
    const ar = pathname
      .replaceAll("en/", "")
      .replaceAll("fr/", "")
      .split("/")
      .slice(2);
    data.forEach((el) => {
      const isActive = ar.length ? Number(ar[etag]) === el.id : false;
      if (isActive) {
        setActiveItem(el);
      }
    });
    return ar;
  }, [pathname, data, etag]);

  return (
    <div>
      <div
        className={`flex gap-2 items-center overflow-auto no-scrollbar
          ${etag === 0 ? "py-2" : etag === 1 ? "!py-0 mb-2" : ""}`}
      >
        {data.map((el, index) => {
          const path = `${link.join("/")}/${el.id}`;
          const isActive = idArray.length
            ? Number(idArray[etag]) === el.id
            : false;

          return (
            <Fragment key={index}>
              {index === 0 && etag === 0 && (
                <Link href="/categories" passHref>
                  <div
                    className={`shadow-black/40 cursor-pointer w-24 h-24 rounded-lg relative overflow-hidden border-2 border-transparent
                      ${pathname === "/categories" ? "!border-primary" : ""}`}
                  >
                    <div className="absolute rounded-md bg-primary transition duration-300 group-hover:scale-110 bg-cover inset-0.5 bg-image" />
                    <div className="absolute inset-0.5 text-white rounded-md flex flex-col justify-end bg-gradient-to-t from-black/30 to-transparent">
                      <div className="p-1">
                        <span className="text-sm font-medium capitalize">
                          All
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              <Link href={path} passHref>
                {etag === 0 ? (
                  <div
                    id={`cat-${etag}-${el.id}`}
                    className={`shadow-black/40 cursor-pointer w-24 h-24 rounded-lg relative overflow-hidden border-2 border-transparent
    ${isActive ? "!border-primary" : ""}`}
                  >
                    <div className="absolute rounded-md inset-0.5">
                      <Image
                        src={getImages(el.image)}
                        alt={el.name}
                        fill
                        className="object-cover rounded-md"
                        sizes="96px"
                        priority={index < 5}
                      />
                    </div>

                    <div className="absolute inset-0.5 rounded-md flex flex-col justify-end bg-gradient-to-t from-black/30 to-transparent">
                      <div className="p-1">
                        <span className="text-sm font-medium capitalize text-white">
                          {el.name.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : etag === 1 ? (
                  <Button
                    size="sm"
                    variant={"default"}
                    id={`cat-${etag}-${el.id}`}
                    className={`capitalize  rounded-full text-black bg-accent whitespace-nowrap font-semibold border-b-2 border-transparent ${
                      isActive ? "border-primary  bg-primary" : ""
                    }`}
                  >
                    {el.name.toLowerCase()}
                  </Button>
                ) : (
                  <div id={`cat-${etag}-${el.id}`} className="cursor-pointer">
                    <Badge
                      className={`whitespace-nowrap px-6 ${
                        isActive ? "bg-primary text-white" : "text-foreground"
                      }`}
                    >
                      {el.name}
                    </Badge>
                  </div>
                )}
              </Link>
            </Fragment>
          );
        })}
      </div>

      {ActiveItem &&
        ActiveItem.subcategories &&
        ActiveItem.subcategories.length > 0 && (
          <CategoryItems
            data={ActiveItem.subcategories}
            etag={etag + 1}
            link={[...link, ActiveItem.id.toString()]}
          />
        )}
    </div>
  );
}
