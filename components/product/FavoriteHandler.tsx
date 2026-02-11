"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToFavorite, removeFromFavorite } from "@/store/slices/cartSlice";
import { useTranslation } from "react-i18next";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { toast } from "sonner";

interface FavoriteHandlerProps {
  product: Product;
  isSmall: boolean;
}

const FavoriteHandler = ({ isSmall, product }: FavoriteHandlerProps) => {
  const faverites = useAppSelector((state) => state.cart.faverites);
  const IsNew = !faverites.find((el) => el.id == product.id);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const handlerFav = () => {
    if (IsNew) {
      dispatch(addToFavorite(product));
      toast.success(t("add_to_fav_alert"));
    } else {
      dispatch(removeFromFavorite(product.id));
      toast.warning(t("remove_from_fav_alert"));
    }
  };

  return (
    <div
      onClick={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
        handlerFav();
      }}
      className="font-medium cursor-pointer flex items-center flex-row gap-1"
    >
      {IsNew ? (
        <MdOutlineFavoriteBorder className="w-6 h-6" />
      ) : (
        <MdOutlineFavorite className="text-primary w-6 h-6" />
      )}
      {!isSmall && (
        <h1 className={`md:text-sm text-xs ${IsNew ? "" : "text-rose-500"}`}>
          {IsNew ? t("add_faves") : t("remove_faver")}
        </h1>
      )}
    </div>
  );
};

export default FavoriteHandler;
