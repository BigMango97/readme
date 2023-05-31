import "@/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "@/configs/axiosConfig";
import { useState } from "react";
import { useCookies } from "react-cookie";
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

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [cookies] = useCookies(["accessToken", "uuid"]);
  if (cookies !== null) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${cookies.accessToken}`;
    axios.defaults.headers.common["uuid"] = `${cookies.uuid}`;
  }
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}
