import statesColor, { subStatesColor } from "@/const/statesColor";
import { useTranslation } from "react-i18next";
type OrderProsType = "default" | "failed" | "return";

interface StateOrderBudgProps {
  state: OrderState;
  subStatus?: OrderSubState;
  type: OrderProsType;
}

function StateOrderBudg({ state, subStatus, type }: StateOrderBudgProps) {
  const { t } = useTranslation();
  return (
    <div
      className={
        "whitespace-nowrap  text-center capitalize rounded-full p-1 px-2   text-[13px] font-semibold border py-1 !text-[" +
        statesColor[state] +
        "] "
      }
      style={
        type == "failed"
          ? {
              color: subStatesColor[subStatus ?? ""],
              borderColor: subStatesColor[subStatus ?? ""] + "26",
              backgroundColor: subStatesColor[subStatus ?? ""] + "22",
            }
          : {
              color: statesColor[state ?? ""],
              borderColor: statesColor[state ?? ""] + "26",
              backgroundColor: statesColor[state ?? ""] + "22",
            }
      }
    >
      {type == "failed" ? subStatus : t("states:" + state) || "undefined"}
    </div>
  );
}

export default StateOrderBudg
