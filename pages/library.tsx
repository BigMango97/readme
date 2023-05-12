import React from "react";
import MyBooks from "@/components/pages/library/MyBooks";
import LibraryTop from "@/components/pages/library/LibraryTop";
import Footer from "@/components/layouts/Footer";
export default function Library() {
  return (
    <>
      <LibraryTop />
      <MyBooks />
      <Footer />
    </>
  );
}
