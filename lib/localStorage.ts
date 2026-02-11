const isBrowser = typeof window !== "undefined";

export const loadData = <T = any>(key: string): T | null => {
  try {
    if (!isBrowser) return null;
    const data = localStorage.getItem(key);
  
    return data&&data!="undefined"&&data!="" ? (JSON.parse(data) as T) : null;
  } catch (err) {
    console.error(`Error loading data for key "${key}":`, err);
    return null;
  }
};

export const saveData = (key: string, value: unknown): void => {
  try {
    if (!isBrowser) return;
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (err) {
    console.error(`Error saving data for key "${key}":`, err);
  }
};

export const saveDataWithTTL = (
  key: string,
  value: unknown,
  ttl: number
): void => {
  try {
    if (!isBrowser) return;
    const now = Date.now();
    const data = {
      value,
      expiry: now + ttl,
    };
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving data with TTL for key "${key}":`, err);
  }
};

export const loadDataWithTTL = <T = any>(key: string): T | null => {
  try {
  if (!isBrowser) return null;
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    const item = JSON.parse(itemStr);
    const now = Date.now();
    if (item.expiry && now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value as T;
  } catch (err) {
    console.error(`Error loading data with TTL for key "${key}":`, err);
    return null;
  }
};
