import FavoritesList from "@/components/favorites/FavoritesList";
import HeaderPage from "@/components/HeaderPage";
import { Suspense } from "react";

export default async function favoritesPage() {
  return (
    <div>
      <HeaderPage titel={"faves"} />
      <Suspense>
        <FavoritesList />
      </Suspense>
    </div>
  );
}
