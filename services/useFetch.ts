import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useFetch = <TData = unknown>(
  options: UseQueryOptions<TData>
): UseQueryResult<TData> => {
  return useQuery<TData>(options);
};