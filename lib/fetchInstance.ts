// lib/fetchInstance.ts
import ApiConfig from "@/config/api.config";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, any>;
  body?: any;
  headers?: HeadersInit;
  revalidate?: number;
  key?: string;
};

type CacheEntry<T> = {
  data: T;
  timestamp: number;
  ttl: number; // seconds
};

const memoryCache = new Map<string, CacheEntry<any>>();

export const fetchInstance = async <T = any>(
  endpoint: string,
  {
    method = "GET",
    params = {},
    body,
    headers = {},
    revalidate = 60, // seconds
    key = "",
  }: FetchOptions = {}
): Promise<T> => {
  const allParams = { ...params, domain: ApiConfig.db };
  const queryString = new URLSearchParams(allParams).toString();
  const url = `${ApiConfig.url}${endpoint}${
    queryString ? `?${queryString}` : ""
  }`;
  const cacheKey = `${key}${url}`;
  const isServer = typeof window === "undefined";

  // ✅ Check cache (only server)
  if (isServer && memoryCache.has(cacheKey)) {
    const entry = memoryCache.get(cacheKey)!;
    const now = Date.now();
    const isValid = now - entry.timestamp < entry.ttl * 1000;
    console.log("GET FROM CHACH-->"+url);
    if (isValid) return entry.data;
    else memoryCache.delete(cacheKey); // remove expired
  }

  // Fetch
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": ApiConfig.content_type,
      Accept: "application/json",
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(isServer ? { next: { revalidate } } : {}),
  });

  if (!res.ok) {

    throw new Error(`Fetch error: ${res.status}`);
  }

  const data = await res.json();



  // ✅ Store in memory cache
  if (isServer) {
    memoryCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      ttl: revalidate,
    });
      console.log("GET NEW -->"+url);
  }
  

  return data;
};

export const fetchInstanceFromUrl = async <T = any>(
  endpoint: string,
  {
    method = "GET",
    params = {},
    body,
    headers = {},
    revalidate = 60, // default 60s cache
    key = "",
  }: FetchOptions = {}
): Promise<T> => {
  // Merge db param
  const allParams = { ...params, domain: ApiConfig.db };
  const queryString = new URLSearchParams(allParams).toString();

  const url = `${endpoint}${queryString ? `?${queryString}` : ""}`;

  const cacheKey = `${key}${url}`;

  const isServer = typeof window === "undefined";

  // ✅ Check cache (only server)
  if (isServer && memoryCache.has(cacheKey)) {
    const entry = memoryCache.get(cacheKey)!;
    const now = Date.now();
    const isValid = now - entry.timestamp < entry.ttl * 1000;
    console.log("GET FROM CHACH-->"+url);
    if (isValid) return entry.data;
    else memoryCache.delete(cacheKey); // remove expired
  }

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": ApiConfig.content_type,
      Accept: "application/json",
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(isServer ? { next: { revalidate } } : {}), // server only
  });

  const data = await res.json();

  // ✅ Store in memory cache
  if (isServer) {
    memoryCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      ttl: revalidate,
    });
      console.log("GET NEW -->"+url);
  }

  return data;
};
