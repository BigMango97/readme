import Config from "@/configs/config.export";
import { loginCheckState } from "@/state/loginState";
//import { userLoginState } from "@/state/atom/userLoginState";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { resolve } from "path/posix";
import { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";

// interface ResponseType {
//   ok: boolean;
//   error?: any;
// }

export default function Kakao() {
  const router = useRouter();
  const code = router.query.code;

  const baseUrl = Config().baseUrl;
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const [loginCheck, setLoginCheck] = useRecoilState(loginCheckState);

  console.log(code);
  useEffect(() => {
    if (code !== undefined) {
      axios.get(`${baseUrl}/login/kakao?code=${code}`).then((res) => {
        console.log("@@@" + JSON.stringify(res));
        console.log(JSON.stringify(res.headers));
        // let sessionStorage = window.sessionStorage;
        // sessionStorage.setItem("userId", res.data.data.userId);
        // sessionStorage.setItem("refreshToken", res.headers.refreshtoken);
        // sessionStorage.setItem("nickname", res.data.data.name);

        let myLogin = localStorage;
        myLogin.setItem("userId", res.data.data.userId);
        myLogin.setItem("refreshToken", res.headers.refreshtoken);
        myLogin.setItem("nickname", res.data.data.name);

        setLoginCheck(true);
        //api 콜 마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.headers.accesstoken}`;

        //refreshToken 쿠키에 저장
        setCookie("id", res.headers.refreshtoken, { path: "/" });
        router.push("/mypage");
      });
    }
  }, [code]);
  // window.Kakao.API.request({
  //   url: "/v2/user/me",
  //   data: {
  //     property_keys: ["kakao_account.email", "kakao_account.gender"],
  //   },
  // })
  //   .then(function (res: any) {
  //     console.log(res);
  //   })
  //   .catch(function (err: any) {
  //     console.log(err);
  //   });
  // window.Kakao.Auth.logout()
  //   .then(function (res: any) {
  //     console.log(window.Kakao.Auth.getAccessToken()); // null
  //   })
  //   .catch(function (err: any) {
  //     console.log("Not logged in.");
  //   });
}
