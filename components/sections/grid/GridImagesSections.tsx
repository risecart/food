
import getImages from "@/lib/getImages";
import { CSSProperties } from "styled-components";

export default function GridImagesSections({ data }: { data: HomePageSection }) {
  const StyleSections: CSSProperties | undefined = {
    paddingTop: data.paddingTop,
    paddingBottom: data.paddingBottom,
    backgroundColor: data.backgroundColor,
  };

  return (
    <div style={StyleSections} className="relative z-0">
      <div
        className="grid gap-0 max-sm:!flex-col max-sm:!flex   "
        style={{
          gridTemplateColumns: `repeat(${
            data.customData?.gridCols ?? 1
          }, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${
            data.customData?.gridRows ?? 1
          }, minmax(0, 1fr))`,
          height: (data.customData?.height ?? 450) + "px",
        }}
      >
        {data.customData?.gridItems?.map((el, k) => {
          return (
            <div
              key={k}
              style={{
                gridColumn: `span ${el.gridColumn ?? 1} / span ${
                  el.gridColumn ?? 1
                }`,
                gridRow: `span ${el.gridRow ?? 1} / span ${el.gridRow ?? 1}`,
              }}
              className="p-1 max-sm:!col-span-full   max-sm:h-[inherit]"
            >
              <div className="relative  h-full w-full overflow-hidden rounded-md">
                <div
                  className="absolute inset-0 bg-image"
                  style={{
                    backgroundImage: `url("${getImages(el.image, true)}")`,
                  }}
                ></div>
                <div className="absolute z-10 opacity-95 p-6 gap-1 flex  flex-col items-start justify-center inset-0">
                  {el.title.isActive !== false && (
                    <h1
                      style={el.title}
                      className="font-semibold max-sm:!text-4xl"
                    >
                      {el.title.text}
                    </h1>
                  )}
                  {el.subTitle.isActive !== false && (
                    <p style={el.subTitle} className="text-sm">
                      {el.subTitle.text}
                    </p>
                  )}
                  {el.button.isActive !== false && (
                    <a
                      href={el.button.link ? el.button.link : "#"}
                      style={el.button}
                      className="cursor-pointer"
                    >
                      {el.button.text}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
