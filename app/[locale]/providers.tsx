
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import StoreProvider from "@/providers/StoreProvider";

export async function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <StoreProvider>
        {children}
        </StoreProvider>
    </ReactQueryProvider>
  );
}
