import AllNovelCardSection from "@/components/pages/novel/AllNovelCardSection";
import AllNovelMenu from "@/components/pages/novel/AllNovelMenu";
import Footer from "@/components/layouts/Footer";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import React from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
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
const queryClient = new QueryClient();


export default function Novel() {
  const router = useRouter();
  const { category, subCategory }: any = router.query;
  const novelMenusQuery = useQuery(["novelMenus"], novelMenus, {
    cacheTime: 10 * 60 * 1000, // 10분
    staleTime: 5 * 60 * 1000, // 5분
    refetchOnWindowFocus: false, // 포커스를 얻을 때마다 다시 요청
  });

  const novelDatasQuery = useQuery(
    ["category", category, "subCategory", subCategory],
    () => novelDatas(category, subCategory),
    {
      cacheTime: 10 * 60 * 1000, // 10분
      staleTime: 5 * 60 * 1000, // 5분
      refetchOnWindowFocus: false, // 포커스를 얻을 때마다 다시 요청
    }
  );

  const novelMenusResult = novelMenusQuery?.data?.data;
  const novelDatasResult = novelDatasQuery?.data;

  return (
    <QueryClientProvider client={queryClient}>
      {novelMenusResult && <AllNovelMenu data={novelMenusResult} />}
      {novelDatasResult && <AllNovelCardSection data={novelDatasResult} />}
      <Footer />
    </QueryClientProvider>
  );
}

// export async function getServerSideProps(context: any) {
//   const { category, subCategory } = context.query;

//   await Promise.all([
//     queryClient.prefetchQuery(["novelMenus"], () => novelMenus()),
//     queryClient.prefetchQuery(
//       ["category", category, "subCategory", subCategory],
//       () => novelDatas(category, subCategory)
//     ),
//   ]);

//   return {
//     props: {
//       dehydrateState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//     },

//   };
// }
