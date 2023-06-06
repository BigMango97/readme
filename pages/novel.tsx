import { useRouter } from "next/router";
import axios from "@/configs/axiosConfig";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";
import { viewerTypeState } from "@/state/viewerType";
import {
  useQuery,
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from "react-query";

import AllNovelCardSection from "@/components/pages/novel/AllNovelCardSection";
import AllNovelMenu from "@/components/pages/novel/AllNovelMenu";
import Footer from "@/components/layouts/Footer";

type ViewerType = "card" | "list";
const novelMenus = async () => {
  const response = await axios.get(`/novels-service/v1/main-category`);
  return response.data;
};

const fetchnovelDatas = async (
  category: string,
  subCategory: string,
  pageParam = 0
) => {
  const response = await axios.get(
    `/sections-service/v1/cards/novels?pagination=${pageParam}&category=${category}&subCategory=${subCategory}`
  );
  return response.data;
};

export default function Novel() {
  const router = useRouter();
  const [viewerType, setViewerType] =
    useRecoilState<ViewerType>(viewerTypeState);

  useEffect(() => {
    setViewerType((router.query.viewerType as ViewerType) || "card");
  }, [router.query.viewerType]);

  const updateViewerType = (type: ViewerType) => {
    setViewerType(type);
    const { category, subCategory } = router.query;
    router.push({
      pathname: router.pathname,
      query: { category, subCategory, viewerType: type },
    });
  };

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

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(
      ["novelDatas", category, subCategory],
      ({ pageParam = 0 }) => fetchnovelDatas(category, subCategory, pageParam),
      {
        getNextPageParam: (lastPage) => {
          const currentPage = lastPage?.data?.page ?? 0;
          const totalPages = lastPage?.data?.totalPages ?? 0;
          if (currentPage < totalPages) {
            return currentPage + 1;
          }
          return null;
        },
        staleTime: 5 * 1000 * 60,
        cacheTime: 10 * 1000 * 60,
      }
    );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("fetching next page...");
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const novelMenusResult = novelMenusQuery?.data?.data;
  const novelDatasResult = data?.pages.flatMap(
    (page) => page.data.novelCardsData
  );
  const totalElementsResult = data?.pages.flatMap(
    (page) => page.data.totalElements
  );

  return (
    <>
      {novelMenusResult && <AllNovelMenu data={novelMenusResult} />}
      {novelDatasResult && totalElementsResult && (
        <AllNovelCardSection
          data={novelDatasResult}
          totalElements={totalElementsResult[0]}
          viewerType={viewerType}
          setViewerType={updateViewerType}
        />
      )}
      <div ref={ref}></div>
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
    () => fetchnovelDatas(String(category), String(subCategory))
  );

  const dehydratedState = dehydrate(queryClient);
  return {
    props: {
      dehydratedState,
    },
  };
};
