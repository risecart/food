type Namespace = "translation" | "zod" | "custom";
type Local = "en" | "fr" | "ar";

type ResourceNamespace = Record<string, any>;

type ResourcesType = {
  [lang in Local]: {
    [ns in Namespace]: ResourceNamespace;
  };
};