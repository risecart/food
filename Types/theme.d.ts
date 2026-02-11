interface ThemeSetting {
  tikTokId?: string;
  pixelId?: string;
  theme?: Theme;
  Menu?: Menu;
  Pages: Page[];
}

interface Menu {
  id: number;
  Title: string;
  headerMenu: AboutMenu;
  aboutMenu: AboutMenu;
  termsAndConditions: AboutMenu;
  contactUs: AboutMenu;
  mainMenu: AboutMenu;
}

interface AboutMenu {
  id: number;
  Title: string;
  listLinks: ListLink[];
}

interface ListLink {
  id: number;
  ExternalLink: ExternalLink;
  name: string;
  Link: string;
}

enum ExternalLink {
  External = "External",
}

interface Page {
  id: number;
  name: string;
  slug: string;
  template: string;
  body: string;
  visibility: boolean;
  created_at: Date;
  updated_at: Date;
  meta: string;
}

interface Theme {
  id: number;
  Logo: string;
  favicon: string;
  MenuFont: string;
  MenuPreview: string;
  productCardStyle: ProductCardStyle;
  BodyFont: string;
  BodyPreview: string;
  Primary: string;
  lightPrimary: string;
  templateType: string;
  darkPrimary: string;
  Secondary: string;
  bodyBackgroundColor: string;
  Success: string;
  info: string;
  Warning: string;
  Danger: string;
  state: boolean;
  globalBreadcrumbs: boolean;
  checkoutBreadcrumbs: boolean;
  DoublePrecision: boolean;
  created_at: Date;
  updated_at: Date;
  CheckoutSettings: CheckoutSettings;
  headerFooterSetting: HeaderFooterSetting;
  generalSetting: null | GeneralSetting;
  ProductSetting: ProductSetting;
  HomePage: HomePage;
}

type ProductCardStyle = {
  price: HTMLCSS;
  oldPrice: HTMLCSS;
  button: HTMLCSS;
  name: HTMLCSS;
  image: {
    isActive?: boolean;
    type: "normal" | "slider";
    style: HTMLCSS;
  };
  parent: HTMLCSS;
  options: HTMLCSS;
  badge: HTMLCSS;
  activeOptions: boolean;
  activeBadge: boolean;
};

interface GeneralSetting {
  id: number;
  storeName: string;
  storeTitle: string | null;
  storeEmail: string | null;
  storeDescription: null;
  storeCurrency: string;
  storeSymbol: null;
  contact_phone: string | null;
  maxCheckoutAmount: null;
  maxCheckoutQuantity: null;
  orderPrefix: null;
  orderSuffix: null;
  orderVat: null;
  orderTimeZone: null;
  customRobotsTxtContent: null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  Instagram_url: string | null;
  TiktokUrl: string | null;
}

interface CheckoutSettings {
  id: number;
  OnePageCheckout: boolean;
  ShowCoupon: boolean;
  firstName: boolean;
  lastName: boolean;
  fullName: boolean;
  email: boolean;
  stopDeskDes: DES;
  homeDes: DES;
  willaya: boolean;
  commune: boolean;
  address: boolean;
  notes: boolean;
  zip: boolean;
}

interface DES {
  ar: string;
  fr: string;
  en: string;
}

interface HomePage {
  id: number;
  HomePageSections: HomePageSection[];
}

interface HomePageSection {
  id: number;
  type: string;
  index: number;
  subTitle: null | string;
  title: null | string;
  format: null;
  size: null;
  ImageShadow: null;
  textSize: null;
  frequency: number;
  height: null;
  content: null;
  cart_type: null;
  customData?: {
    gridCols?: number;
    gridRows?: number;
    height?: number;
    gridItems?: {
      container?: HTMLCSS;
      image: string;
      title: HTMLCSS;
      subTitle: HTMLCSS;
      button: HTMLCSS;
      gridColumn?: number;
      gridRow?: number;
    }[];
    imagePrice?: {
      image: string;
      title: HTMLCSS;
      subTitle: HTMLCSS;
      promo: HTMLCSS;
      description: HTMLCSS[];
      button: HTMLCSS;
    };
  };
  limit: number | null;
  typeCart: null;
  showLoadMore: boolean | null;
  titleColor: null | string;
  subTitleColor: null | string;
  textColor: null | string;
  itemPriceColorBefore: null | string;
  itemPriceColorAfter: null | string;
  itemTitle: null | string;
  itemBorderColor: null | string;
  itemBorderColorHover: null | string;
  paddingTop: number;
  paddingBottom: number;
  backgroundColor: string;
  Button: Button | null;
  Style: Style | null;
  category: Category | null;
  Product: Product | null;
  categories: Category[];
  itemButton: Button | null;
  itemStyle: Style | null;
  sliders: Slider[];
}

interface Button {
  id: number;
  title: string;
  size: string;
  fontSize: string;
  color: string;
  backgroundColor: string;
  titleHover: string;
  borderColor: string;
  borderColorHover: string;
  backgroundHover: string;
}

interface Product {
  images: string[];
  tags: any[];
  returningOrderRefs: null;
  fulfilledOrderRefs: null;
  pendingOrderRefs: null;
  id: number;
  name: string;
  sku: null;
  barcode: null;
  slugName: string;
  description: null;
  currency: string;
  isLandingPage: boolean;
  externalId: null;
  externalPlatform: null;
  htmlData: null;
  jsonData: null;
  isOnePage: boolean;
  freeshipping: boolean;
  state: boolean;
  requires_restock: boolean;
  trash: boolean;
  price: number;
  drop_price: null;
  min_selling_drop_price: null;
  is_drop_shipping: boolean;
  CompareAtPrice: number;
  originalPrice: number;
  stock: number;
  phantom_inventory: number;
  range: null;
  stage: null;
  position: null;
  sold_out: number;
  discount: number;
  weight: string;
  width: number;
  height: number;
  length: number;
  dimensions: string;
  maystro_id: null;
  rating: number;
  showTitle: boolean;
  showInPage: boolean;
  catalog: boolean;
  underStock: boolean;
  deductStockOnCreate: boolean;
  specificPriceDelivery: boolean;
  deliveryCostToTheOffice: null;
  deliveryCostToTheHome: null;
  hasOffer: boolean;
  priceOffer: null;
  minNumberQteOffer: null;
  showImages: boolean;
  showPriceDiscount: boolean;
  showPriceTotal: boolean;
  showCountdown: boolean;
  limitAlert: number;
  limitAlertOne: number;
  limitAlertTwo: number;
  sub_description: string;
  note: null;
  createdAt: Date;
  updatedAt: Date;
  pendingRestock: number;
  allocatedStock: number;
  reservedDemand: number;
}

interface Style {
  id: number;
  paddingTop: number | null;
  paddingBottom: number | null;
  backgroundColor: string;
  color: string;
  fontSize: string;
  height: null;
}

interface Category {
  id: number;
  name: string;
  image: string;
  state: boolean;
  trash: boolean;
  parentCategory: null | Category;
  subcategories: null | Category[];
  created_at: Date;
  updated_at: Date;
}

interface Slider {
  id: number;
  image: string;
  mobileImage: string;
  position: string;
  link: string;
  index: number;
  headingText: string;
  headingColor: string;
  subheadingText: string;
  subheadingColor: string;
  mediaType: null;
  videoLink: null;
}

interface ProductSetting {
  id: number;
  title: boolean;
  images: boolean;
  price: boolean;
  visitorsMin: number;
  visitorsMax: number;
  stockMin: number;
  stockMax: number;
  countdownDay: number;
  Primary: string;
  Secondary: string;
  Selected: string;
  countdownHours: number;
  countdownMinutes: number;
  countdownSeconds: number;
  titleColor: string;
  LinkColor: string;
  PriceColorBefore: string;
  PriceColorAfter: string;
  variants: boolean;
  scarcity: boolean;
  visitors: boolean;
  countdown: boolean;
  description: boolean;
  expressCheckoutForm: boolean;
  addToCartQuantity: boolean;
  facebookShare: boolean;
  twitterShare: boolean;
  whatsappShare: boolean;
  Reviews: boolean;
  TruncateDescription: boolean;
  RelatedProducts: boolean;
  DirectAddToCart: boolean;
  Cart: Cart;
  QuantityStyle: Style;
  SectionStyle: Style;
}

interface Cart {
  id: number;
  text: string;
  StickyOnMobile: boolean;
  StickyOnDesktop: boolean;
  QuantitySelector: boolean;
  SkipCart: boolean;
}

interface HeaderFooterSetting {
  id: number;
  MobileNoticeBar: string;
  DesktopNoticeBar: string;
  CustomFooterContent: string;
  HeaderBackground: string;
  HeaderBorderColor: string;
  HeaderButtonsColor: string;
  FooterBorderColor: string;
  FooterTextColor: string;
  FooterBackground: string;
  CustomFooter: boolean;
  headersBorderColor: boolean;
  FooterBorder: boolean;
  ShowLogo: boolean;
  ShowSearch: boolean;
  ShowCart: boolean;
  ShowUser: boolean;
  ShowMenu: boolean;
  ShowMenuIcon: boolean;
}
