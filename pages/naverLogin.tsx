import Login from "@/components/ui/Login";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

const NaverLogin = () => {
  const router = useRouter();
  const code = router.query.code;
  console.log("code = ", router.query);

  return <>성공해라</>;
};
export default NaverLogin;
