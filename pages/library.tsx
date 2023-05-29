import React, { useState } from "react";
import MyBooks from "@/components/pages/library/MyBooks";
import LibraryTop from "@/components/pages/library/LibraryTop";
import Footer from "@/components/layouts/Footer";
import isLogin from "@/configs/isLogin";
import Login from "./login";
import { useRouter } from "next/router";
import LikeBooks from "@/components/pages/library/LikeBooks";

export default function Library() {
  const router = useRouter();
  const currentTap: string | undefined = router.query.id?.toString();

  return (
    <>
      {isLogin() ? (
        <>
          <LibraryTop />
          {currentTap === "3" ? (
            <LikeBooks />
          ) : currentTap === "2" ? (
            <LikeBooks />
          ) : (
            <LikeBooks />
          )}
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
