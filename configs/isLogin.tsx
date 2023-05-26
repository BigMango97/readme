import React from "react";
import { useCookies } from "react-cookie";

const isLogin = () => {
  const [cookies] = useCookies(["accessToken"]);
  if (cookies) {
    return false;
  } else return true;
};

export default isLogin;
