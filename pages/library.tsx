import React from "react";
import MyBooks from "@/components/pages/library/MyBooks";
import LibraryTop from "@/components/pages/library/LibraryTop";
import Footer from "@/components/layouts/Footer";
import isLogin from "@/configs/isLogin";
import Login from "./login";
export default function Library() {
  return (
    <>
      {isLogin() ? (
        <>
          <LibraryTop />
          <MyBooks />
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
