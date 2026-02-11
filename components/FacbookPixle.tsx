"use client";

import {  useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

function addFacebookPixelVerification(pixelId: string, key: string) {
  if (!pixelId || typeof window === "undefined") return;
  if (document.querySelector(`meta[name="${key}"]`)) return;
  const metaTag = document.createElement("meta");
  metaTag.name = key;
  metaTag.content = pixelId;
  document.head.appendChild(metaTag);
}

export default function FacbookPixle() {
  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
      if (theme.pixelId) {
        addFacebookPixelVerification(
          theme.pixelId,
          "facebook-domain-verification"
        );
         if (theme.pixelId && !document.getElementById("facebook-pixel")) {
        const fbScript = document.createElement("script");
        fbScript.id = "facebook-pixel";
        fbScript.innerHTML = `
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
            n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${theme.pixelId}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(fbScript);
      }
    }
  }, [theme]);


  return null;
}
