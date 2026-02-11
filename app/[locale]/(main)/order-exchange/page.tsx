
import HeaderPage from "@/components/HeaderPage";
import { OrderExchange } from "@/components/tracking/OrderExchange";


export default async function ExchangePage() {
  return (
    <div>
      <HeaderPage titel={"exchange"} />
      <OrderExchange/>

    </div>
  );
}
