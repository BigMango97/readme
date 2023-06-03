import { ReactNode, useEffect, useState } from "react";
import LibraryTop from "../pages/library/LibraryTop";
import Footer from "./Footer";
import { useCookies } from "react-cookie";
import Login from "@/pages/login";

export default function LibraryLayout(props: { children: ReactNode }) {
  const [cookies] = useCookies(["uuid"]);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);

  useEffect(() => {
    setLoginCheck(cookies.uuid);
  }, []);
  return (
    <>
      {loginCheck ? (
        <>
          <LibraryTop />
          <div>{props.children}</div>
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
