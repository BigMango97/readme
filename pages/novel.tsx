import AllNovelCardSection from "@/components/pages/novel/AllNovelCardSection";
import AllNovelMenu from "@/components/pages/novel/AllNovelMenu";
import Footer from "@/components/layouts/Footer";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import {
  useQuery,
  QueryClient,
  dehydrate,
} from "react-query";
import Config from "@/configs/config.export";
const baseUrl = Config().baseUrl;
const novelMenus = async () => {
  const response = await axios.get(
    `${baseUrl}/novels-service/v1/main-category`
  );
  return response.data;
};

const novelDatas = async (
  category: string,
  subCategory: string
): Promise<AxiosResponse> => {
  const response = await axios.get(
    `${baseUrl}/sections-service/v1/cards/novels?pagination=0&category=${category}&subCategory=${subCategory}`
  );
  return response.data;
};

interface Props {
  dehydratedState: unknown;
}

export default function Novel({ dehydratedState }: Props) {
  const router = useRouter();
  const { category, subCategory }: any = router.query;

  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const novelMenusQuery = useQuery(["novelMenus"], novelMenus, {
    cacheTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const novelDatasQuery = useQuery(
    ["category", category, "subCategory", subCategory],
    () => novelDatas(category, subCategory),
    {
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  const novelMenusResult = novelMenusQuery?.data?.data;
  const novelDatasResult = novelDatasQuery?.data;

  return (
    <>
      {novelMenusResult && <AllNovelMenu data={novelMenusResult} />}
      {novelDatasResult && <AllNovelCardSection data={novelDatasResult} />}
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category, subCategory } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["novelMenus"], novelMenus);
  await queryClient.prefetchQuery(
    ["category", category, "subCategory", subCategory],
    () => novelDatas(String(category), String(subCategory))
  );

  const dehydratedState = dehydrate(queryClient);
  return {
    props: {
      dehydratedState,
    },
  };
};
