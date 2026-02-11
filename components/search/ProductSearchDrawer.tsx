'use client';
import productService from "@/services/produit.service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSearchDraw } from "@/store/slices/settingSlice";
import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import SearchItems from "./SearchItems";
import Searchskeleton from "../skeleton/Searchskeleton";

import EmptyItems from "./EmptyItems";
import { useRouter } from "next/navigation";

export default function ProductSearchDrawer() {
  const search = useAppSelector((state) => state.setting.searchOpen);
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [fillter, setFillter] = useState<FillterProduit>({
    limit: 5,
    page: 1,
    name: "",
  });
  const { data, isLoading, error, refetch } =
    productService.useGetProduct(fillter);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isCtrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      if (isCtrlOrCmd && e.key.toLowerCase() === "f") {
        e.preventDefault(); // prevent browser search
        dispatch(openSearchDraw(true));
      }

      if (e.key === "Escape") {
        dispatch(openSearchDraw(false));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    if (search) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100); // slight delay to ensure element is mounted
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }
    return () => {
      document.body.style.overflowY = "";
    };
  }, [search]);

  useEffect(() => {
    if (search) {
      setShouldRender(true);
      requestAnimationFrame(() => setVisible(true)); // triggers transition
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setShouldRender(false), 400); // match CSS duration
      return () => clearTimeout(timeout);
    }
  }, [search]);

  useEffect(() => {
    if (fillter.name != "") refetch();
  }, [fillter.name]);

  if (!shouldRender) return null;

  return (
    <>
      <div
        onClick={() => dispatch(openSearchDraw(false))}
        className={`fixed inset-0 bg-black/40 z-40 transition-[backdrop-filter,opacity] duration-300 ${
          visible
            ? "backdrop-blur-sm opacity-100"
            : "backdrop-blur-none opacity-0"
        }`}
      />
      <div
        className={`fixed top-[17%] left-1/2 flex flex-col transform -translate-x-1/2 z-50 w-full h-fit  max-w-[600px] max-h-[90vhd]  bg-white ${
          data?.data.length && !isLoading && !error ? "pt-2 px-2" : "p-2"
        } rounded-xl shadow-lg overflow-auto transition-all duration-300 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <SearchInput
          ref={inputRef}
          className="p-2 "
          value={fillter.name ? fillter.name : ""}
          onChange={(e) => setFillter({ ...fillter, name: e.target.value })}
          onClearValue={() => setFillter({ ...fillter, name: "" })}
          loading={isLoading}
        />
        <div
          className={`transition-all duration-300 ${
            fillter.name
              ? "max-h-[75vh] relative opacity-100 overflow-y-auto"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <hr className="w-full py-1" />
          {data?.data.length && !isLoading && !error ? (
            <div className="px-2  pb-0  flex flex-col gap-2">
              {data?.data.map((x, i) => (
                <SearchItems
                  onClickProduct={() => {
                    dispatch(openSearchDraw(false));
                    router.push("/product/" + x.slugName);
                    setTimeout(() => {
                      setFillter({ ...fillter, name: "" });
                    }, 300);
                  }}
                  key={i}
                  data={x}
                />
              ))}
            </div>
          ) : isLoading ? (
            <div className="px-2 pt-2 pb-0 flex flex-col gap-2">
              <Searchskeleton />
              <Searchskeleton />
              <Searchskeleton />
              <Searchskeleton />
              <Searchskeleton />
            </div>
          ) : (
            <div className="h-fit m-auto relative ">
              <EmptyItems />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
