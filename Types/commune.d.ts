interface Commune {
  deliveryCostToTheHome: number | null;
  deliveryCostToTheOffice: number | null;
  id: number;
  name: string;
  showDeliveryCostToTheHome: boolean;
  showDeliveryCostToTheOffice: boolean;
}

interface CommuneReponse {
  communes: Commune[];
  deliveryCostToTheHome: number | null;
  deliveryCostToTheOffice: number | null;
  id: number;
  name: string;
  showDeliveryCostToTheHome: boolean;
  showDeliveryCostToTheOffice: boolean;
}

interface CommunePriceReponse {
  center_id?: number;
  name?: string;
  address?: number;
  gps?: string;
  commune_id?: number;
  commune_name?: string;
  wilaya_id?: number;
  wilaya_name?: string;
  created_at?: string;
  updated_at?: string;
  priceDeliveryHome: number;
  priceDeliveryOffice?: number;
}
