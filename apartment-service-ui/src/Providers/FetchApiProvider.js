import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export function FetchApiProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
     { children }
    </QueryClientProvider>
  );
}
