import img_notfound from "../assets/Image-not-found.png";

const Cloud_Flare =
  "https://pub-1c37b2c0ac504af39f174eebcbfdfd39.r2.dev/upload";
export default function getImages(
  src: string | null | undefined,
  withUrl?: boolean
) {
  src = src?.replace("https://api.risecart.net/", "");
  if (withUrl) {
    return !!src ? Cloud_Flare + "/" + src : img_notfound;
  }
  return !!src ? Cloud_Flare + "/" + src : img_notfound;
}
