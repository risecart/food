import HeaderPage from "@/components/HeaderPage";
import themeService from "@/services/theme.service";
import Head from "next/head";
import { notFound } from "next/navigation";
import { cache } from "react";

interface Props {
  params: Promise<{ locale: Local; dynamic?: string }>;
}

const GetPages = cache(async ({ params }: Props) => {
  const { dynamic } = await params;
  const data = await themeService.getThemeServer();
  const Page = data.Pages.find((x) => x.slug == dynamic);
  return Page;
});

export async function generateMetadata({ params }: Props) {
  const Page = await GetPages({
    params: params,
  });
  if (!(Page && Page.body)) {
    return notFound();
  }
  return {
    title: Page.name,
    description: Page.meta,
  };
}

export default async function DynamicePage({ params }: Props) {
  const Page = await GetPages({
    params: params,
  });

  return (
    Page && (
      <>
        <Head>
          <title>cxc</title>
        </Head>
        <div>
          <HeaderPage titel={Page.name} />
          {Page.body && (
            <div
              className="p-2"
              dangerouslySetInnerHTML={{ __html: Page.body }}
            ></div>
          )}
        </div>
      </>
    )
  );
}
