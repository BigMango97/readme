import { ReactNode } from "react";
import LibraryTop from "../pages/library/LibraryTop";
import Footer from "./Footer";

export default function LibraryLayout(props: { children: ReactNode }) {
  return (
    <>
      <LibraryTop />
      <div>{props.children}</div>
      <Footer />
    </>
  );
}
