import axiosInstance from "@/lib/axiosInstance";
import sha256 from "crypto-js/sha256";

type TypeEvent = "facebook" | "tiktok" | "";
// Send Facebook Pixel event
const sendEventFacebook = (data: EventFacebook) => {
  return axiosInstance.post("/tenant/facebook-pixel/events", data);
};

// Send TikTok Pixel event
const sendEventTiktok = (data: EventTiktok) => {
  return axiosInstance.post("/tenant/tiktok/events", data);
};

// Get cookie value
const getCookieM = (cname: string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

// Hash for Facebook (lowercase then sha256)
function hashForFacebookPixel(data: string) {
  return sha256(data.toLowerCase()).toString();
}

// ViewContent Event
const viewContentEvent = (data: ProductCart, type: TypeEvent) => {
  if (type == "facebook")
    void sendEventFacebook({
      data: [
        {
          event_name: "ViewContent",
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: window.location.href,
          user_data: {
            fbc: getCookieM("_fbc"),
            fbp: getCookieM("_fbp"),
          },
          custom_data: {
            currency: "dzd",
            value: data.price,
          },
        },
      ],
    }).catch(console.error);

  if (type == "tiktok")
    void sendEventTiktok({
      eventData: {
        contents: [
          {
            id: data.id + "",
            price: data.price,
            quantity: data.qte,
          },
        ],
      },
      eventType: "ViewContent",
      userData: {
        _ttp: getCookieM("_ttp"),
        ...(getCookieM("ttclid") && { ttclid: getCookieM("ttclid") }),
      },
    }).catch(console.error);
};

// AddToCart Event
const addToCartEvent = (data: ProductCart, type: TypeEvent) => {
  if (type == "facebook")
    void sendEventFacebook({
      data: [
        {
          event_name: "AddToCart",
          event_time: Math.floor(Date.now() / 1000),
          user_data: {
            fbc: getCookieM("_fbc"),
            fbp: getCookieM("_fbp"),
          },
          custom_data: {
            currency: "dzd",
            value: data.price,
            contents: [{ id: data.id, quantity: data.qte }],
          },
          event_source_url: window.location.href,
          action_source: "website",
        },
      ],
    }).catch(console.error);

  if (type == "tiktok")
    void sendEventTiktok({
      eventData: {
        contents: [
          {
            id: data.id + "",
            price: data.price,
            quantity: data.qte,
          },
        ],
      },
      eventType: "AddToCart",
      userData: {
        _ttp: getCookieM("_ttp"),
        ...(getCookieM("ttclid") && { ttclid: getCookieM("ttclid") }),
      },
    }).catch(console.error);
};

// Purchase Event
const purchaseEvent = (
  data: ProductCart[],
  total: number,
  user: {
    contact_phone: string;
    fullName: string;
    to_commune_name: string;
    to_wilaya_name: string;
  },
  type: TypeEvent
) => {
  if (type == "facebook")
    void sendEventFacebook({
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          user_data: {
            ph: [hashForFacebookPixel(user.contact_phone)],
            fn: [hashForFacebookPixel(user.fullName)],
            ct: [hashForFacebookPixel(user.to_commune_name)],
            st: [hashForFacebookPixel(user.to_wilaya_name)],
            ln: [hashForFacebookPixel(user.fullName)],
            fbc: getCookieM("_fbc"),
            fbp: getCookieM("_fbp"),
          },
          custom_data: {
            currency: "dzd",
            value: total,
            content_type: "product",
            contents: data.map((el) => ({
              id: el.id,
              quantity: el.qte,
            })),
            content_ids: data.map((el) => el.slugName),
          },
          event_source_url: window.location.href,
          action_source: "website",
        },
      ],
    }).catch(console.error);

  if (type == "tiktok")
    void sendEventTiktok({
      eventData: {
        contents: data.map((el) => ({
          id: el.id + "",
          quantity: el.qte,
          price: el.price,
        })),
      },
      eventType: "Purchase",
      userData: {
        _ttp: getCookieM("_ttp"),
        ...(getCookieM("ttclid") && { ttclid: getCookieM("ttclid") }),
      },
    }).catch(console.error);
};

// InitiateCheckout Event
const initiateCheckoutEvent = (
  data: ProductCart[],
  total: number,
  type: TypeEvent
) => {
  if (type == "facebook")
    void sendEventFacebook({
      data: [
        {
          event_name: "InitiateCheckout",
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: window.location.href,
          action_source: "website",
          user_data: {
            fbc: getCookieM("_fbc"),
            fbp: getCookieM("_fbp"),
          },
          custom_data: {
            currency: "dzd",
            value: total,
            contents: data.map((el) => ({
              id: el.id,
              quantity: el.qte,
            })),
          },
        },
      ],
    }).catch(console.error);

  if (type == "tiktok")
    void sendEventTiktok({
      eventData: {
        contents: data.map((el) => ({
          id: el.id + "",
          quantity: el.qte,
          price: el.price,
        })),
      },
      eventType: "InitiateCheckout",
      userData: {
        _ttp: getCookieM("_ttp"),
        ...(getCookieM("ttclid") && { ttclid: getCookieM("ttclid") }),
      },
    }).catch(console.error);
};

// AddToWishlist Event
const addToWishlistEvent = (data: Product, type: TypeEvent) => {
  if (type == "facebook")
    void sendEventFacebook({
      data: [
        {
          event_name: "AddToWishlist",
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: window.location.href,
          action_source: "website",
          user_data: {
            fbc: getCookieM("_fbc"),
            fbp: getCookieM("_fbp"),
          },
          custom_data: {
            currency: "dzd",
            value: data.price,
          },
        },
      ],
    }).catch(console.error);
  if (type == "tiktok")
    void sendEventTiktok({
      eventData: {
        contents: [
          {
            id: data.id + "",
            price: data.price,
            quantity: 1,
          },
        ],
      },
      eventType: "AddToWishlist",
      userData: {
        _ttp: getCookieM("_ttp"),
        ...(getCookieM("ttclid") && { ttclid: getCookieM("ttclid") }),
      },
    }).catch(console.error);
};

// Export service
const eventsService = {
  viewContentEvent,
  addToCartEvent,
  purchaseEvent,
  initiateCheckoutEvent,
  addToWishlistEvent,
};

export default eventsService;
