import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { BsZoomIn } from "react-icons/bs";
import { HiOutlineZoomIn, HiOutlineZoomOut } from "react-icons/hi";
import useTouchOutside from "@/hook/TouchOutSide";
import useMediaQuery from "@/hook/useMediaQuery";

interface ZoomableImageProps {
  src: string;
}

const Width = 320;
const WidthMobile = 240;

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src }) => {
  const { t } = useTranslation();
  const [openZoom, setOpenZoom] = useState(false);
  const [large, setLarge] = useState(false);
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  const [cursorPosition, setCursorPosition] = useState({
    x: WidthMobile / 2,
    y: WidthMobile / 2,
  });

  const ref = useTouchOutside({
    onOutsideTouch: () => setOpenZoom(false),
  });

  const { width: screenWidth } = useMediaQuery();

  const calculateZoomPosition = useCallback(
    (clientX: number, clientY: number, rect: DOMRect, isMobile: boolean) => {
      const width = isMobile ? WidthMobile : Width;
      const xPercent = ((clientX - rect.left) / rect.width) * 100;
      const yPercent = ((clientY - rect.top) / rect.height) * 100;
      setPosition({ x: `${xPercent}%`, y: `${yPercent}%` });

      let x = clientX - rect.left;
      let y = clientY - rect.top;

      x = Math.min(Math.max(x, width / 2), rect.width - width / 2);
      y = Math.min(Math.max(y, width / 2), rect.height - width / 2);

      setCursorPosition({ x, y });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      calculateZoomPosition(e.clientX, e.clientY, rect, false);
    },
    [calculateZoomPosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!openZoom) return;
      e.stopPropagation();
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      calculateZoomPosition(touch.clientX, touch.clientY, rect, true);
    },
    [calculateZoomPosition, openZoom]
  );

  const toggleZoom = () => {
    setLarge((prev) => !prev);
    setOpenZoom((prev) => !prev);
  };

  const ZoomLens = ({ isMobile }: { isMobile: boolean }) => {
    const width = isMobile ? WidthMobile : Width;

    return (
      <div
        className={`absolute z-20 bg-cover rounded-full pointer-events-none shadow-lg ${
          isMobile
            ? "sm:hidden"
            : "max-sm:hidden group-hover:opacity-100 group-hover:scale-100 scale-0"
        }`}
        style={{
          top: `${cursorPosition.y - width / 2}px`,
          left: `${cursorPosition.x - width / 2}px`,
          backgroundImage: `url('${src}')`,
          height: `${width}px`,
          width: `${width}px`,
          backgroundPosition: `${position.x} ${position.y}`,
          backgroundSize: isMobile ? "300%" : large ? "500%" : "300%",
          transition: "transform 0.5s, opacity 0.5s",
          boxShadow: "0 0 30px 4px #0005, 0 0 10px 0px #0002 inset",
        }}
      >
        <div
          dir="ltr"
          className={`absolute flex items-center gap-1 p-2 text-xs font-semibold text-white bg-black/90 ${
            isMobile ? "left-1/2 -translate-x-1/2 whitespace-nowrap" : "left-2"
          } ${cursorPosition.y - width / 2 < 50 ? "top-full" : "bottom-full"} ${
            isMobile ? "" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {isMobile ? (
            t("msg_zoom_prod")
          ) : (
            <>
              <BsZoomIn className="w-4 h-4 min-w-[16px] min-h-[16px]" />
              <span>x</span>
              <span>{large ? 5 : 3}</span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={`relative z-0 overflow-hidden group h-full ${
        openZoom ? "fixed inset-0" : ""
      }`}
      key={src}
      onClick={toggleZoom}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{ cursor: large ? "zoom-in" : "zoom-out" }}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={src}
          alt={src}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 500px"
          priority
          className={`object-cover transition-all rounded-lg duration-300 w-full h-full ${
            openZoom ? "blur-[3px]" : ""
          } sm:group-hover:grayscale-[10%] sm:group-hover:blur-[3px]`}
          style={{ objectFit: "cover" }}
        />
      </div>

      {!screenWidth || screenWidth > 640 ? (
        <ZoomLens isMobile={false} />
      ) : (
        openZoom && (
          <>
            <ZoomLens isMobile={true} />
            <DisablaScroll />
          </>
        )
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenZoom(!openZoom);
        }}
        className="absolute top-auto bottom-2 left-2 rounded-full  sm:hidden bg-primary/90 p-2  text-white"
      >
        {openZoom ? (
          <HiOutlineZoomOut className="w-5 h-5" />
        ) : (
          <HiOutlineZoomIn className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

function DisablaScroll() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    return () => {
      document.body.style.overflow = "initial";
      document.body.style.height = "initial";
    };
  }, []);
  return null;
}



export default ZoomableImage;
