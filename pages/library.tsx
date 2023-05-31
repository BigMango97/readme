import React, { useEffect, useState } from "react";
import MyBooks from "@/components/pages/library/MyBooks";
import LibraryTop from "@/components/pages/library/LibraryTop";
import Footer from "@/components/layouts/Footer";

import Login from "./login";
import { useRouter } from "next/router";
import LikeBooks from "@/components/pages/library/LikeBooks";
import { loginCheckState } from "@/state/loginState";
import { useRecoilState } from "recoil";
import { useCookies } from "react-cookie";
import isLogin from "@/configs/isLogin";
import { NextPageWithLayout } from "./_app";
import LibraryLayout from "@/components/layouts/LibraryLayout";

const Library: NextPageWithLayout = () => {
  const router = useRouter();
  const currentTap: string | undefined = router.query.id?.toString();

  return (
    <>
      {/* {loginCheck ? (
        currentTap === "3" ? (
          <LikeBooks />
        ) : currentTap === "2" ? (
          <LikeBooks />
        ) : (
          <LikeBooks />
        )
      ) : (
        <Login />
      )} */}
      {currentTap === "3" ? (
        <LikeBooks />
      ) : currentTap === "2" ? (
        <LikeBooks />
      ) : (
        <LikeBooks />
      )}
    </>
  );
};
export default Library;

Library.getLayout = function getLayout(page: React.ReactNode) {
  return <LibraryLayout>{page}</LibraryLayout>;
};
