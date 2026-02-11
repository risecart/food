interface Fillter {
  limit: number;
  page: number;
}

interface FillterCategory extends Fillter {
  name?: string;
  categoryId?: number;
}

interface FillterProduit extends Fillter {
  name?: string;
  categoryId?: number;
}

interface Fillterwilaya extends Fillter {}

interface FillterCommune extends Fillter {
  id_wilaya?: number;
}

interface FillterCommunePricing extends Fillter {
  id_commune?: number;
  product?: number[];
}

interface FillterReviews extends Fillter {
  product?: string;
}
