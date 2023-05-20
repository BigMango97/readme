import Config from "@/configs/config.export";
//import { userLoginState } from "@/state/atom/userLoginState";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { resolve } from "path/posix";
import { useCallback, useEffect } from "react";
//import { useCookies } from "react-cookie";
//import { useRecoilState } from "recoil";

interface ResponseType {
  ok: boolean;
  error?: any;
}

export default function Kakao() {
  const router = useRouter();
  const code = router.query.code;

  const baseUrl = Config().baseUrl;
  //const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  //const [loginData, setLoginData] = useState();

  console.log(code);
  useEffect(() => {
    if (code !== undefined) {
      axios.get(`${baseUrl}/login/kakao?code=${code}`).then((res) => {
        console.log("@@@" + JSON.stringify(res));
        console.log(JSON.stringify(res.headers));
        // setLoginData({
        //   userId: res.data.data.userId,
        //   accessToken: res.headers.accesstoken,
        //   refreshToken: res.headers.refreshtoken,
        //   isLogin: true,
        // });
        // let myLogin = localStorage;
        // myLogin.setItem("userId", res.data.data.userId);
        // myLogin.setItem("refreshToken", res.headers.refreshtoken);
        // myLogin.setItem("nickname", res.data.data.name);
        // setCookie("id", res.headers.accesstoken, { path: "/" });
        router.push("/");
      });
    }
  }, [code]);
  window.Kakao.API.request({
    url: "/v2/user/me",
    data: {
      property_keys: ["kakao_account.email", "kakao_account.gender"],
    },
  })
    .then(function (res: any) {
      console.log(res);
    })
    .catch(function (err: any) {
      console.log(err);
    });
  window.Kakao.Auth.logout()
    .then(function (res: any) {
      console.log(window.Kakao.Auth.getAccessToken()); // null
    })
    .catch(function (err: any) {
      console.log("Not logged in.");
    });
}
