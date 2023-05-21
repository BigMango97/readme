import "@/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "react-query/devtools";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });

  return getLayout(
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}
