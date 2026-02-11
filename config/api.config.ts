const url = "https://api.riseconfirm.com";
const dbEnv = "hanouteek-food.risecart.net"//process.env.NEXT_PUBLIC_DB;
type DB = string | undefined;
const db: DB = (dbEnv ?? "").replace("www.", "");
const param = {
  url: url + "/api/v1",
  rootUrl: url,
  swrStop: {
    dedupingInterval: 500000,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    revalidateOnFocus: false,
  },
  content_type: "application/json",
  firebase: false,
  urls: {
    theme: url + "/api/v1/tenant/store/findOne",
  },
  db,
};

type ApiConfigType = typeof param;
var ApiConfig: ApiConfigType = param;

export default ApiConfig;
