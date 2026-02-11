import themeService from "@/services/theme.service";
import ThemeInitializer from "./ThemeInitializer";
import Head from "next/head";

interface ThemeInitProps {
  children: React.ReactNode;
  data:ThemeSetting
}



export default async function ThemeInit({ children,data }: ThemeInitProps) {
 
  const primary = data?.theme?.Primary || "#000000";

  return (
    <>
    
      <style>{`:root { 
      --primary: ${primary}; 
      --swiper-theme-color:${primary} !important; 
      }`}</style>
      <ThemeInitializer {...data} />
  
      {children}
    </>
  );
}
