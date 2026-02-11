interface ResponseAtt<T> {
  page: number;
  limit: number;
  totalCount: number;
  hasMore: boolean;
  data: T[];
}

interface ResponseOrder {
  message: string;
  order: number;
  otp: boolean;
}

interface ResponsePromo {
    price_items: number | null,
    price_total: number | null,
    price_promo: number,
}
