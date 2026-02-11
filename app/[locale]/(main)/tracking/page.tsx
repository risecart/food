
import HeaderPage from "@/components/HeaderPage";
import { TrakingOrder } from "@/components/tracking/TrakingOrder";

export default async function TrackingPage() {
  return (
    <div>
      <HeaderPage titel={"tracking"} />
      <TrakingOrder/>
    </div>
  );
}
