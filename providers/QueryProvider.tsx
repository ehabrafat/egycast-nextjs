"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

interface QueryProviderProbs {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProbs> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
