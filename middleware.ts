import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // 🟡 تحقق إذا كان في مسار categories
  const pathname = url.pathname;
  const isCategoriesPath = /^\/[a-z]{2}\/categories(?:\/.*)?$/.test(pathname);

  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");

  if (isCategoriesPath && (!page || !limit)) {
    url.searchParams.set("page", page ?? "1");
    url.searchParams.set("limit", limit ?? "10");
    return NextResponse.redirect(url);
  }

  // 🟢 إذا لم يكن ضمن /categories → استخدم i18nRouter بشكل عادي
  return i18nRouter(request, i18nConfig);
}


export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};
