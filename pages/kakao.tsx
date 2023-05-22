import Config from "@/configs/config.export";
import { loginCheckState, userDataState } from "@/state/loginState";
//import { userLoginState } from "@/state/atom/userLoginState";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { resolve } from "path/posix";
import { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";

export default function Kakao() {
  const router = useRouter();
  const code = router.query.code;

  const baseUrl = Config().baseUrl;
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const [loginCheck, setLoginCheck] = useRecoilState(loginCheckState);
  const [userData, setUserData] = useRecoilState(userDataState);

  console.log(code);
  useEffect(() => {
    if (code !== undefined) {
      axios
        .get(`https://api.readme.life/users-service/v1/user/login?code=${code}`)
        .then((res) => {
          console.log(JSON.stringify(res.headers));
          console.log("res.headers ", res.headers);

          // let myLogin = localStorage;
          // myLogin.setItem("userId", res.data.data.userId);
          // myLogin.setItem("refreshToken", res.headers.refreshtoken);
          // myLogin.setItem("nickname", res.data.data.name);

          // setLoginCheck(true);
          // //api 콜 마다 헤더에 accessToken 담아 보내도록 설정
          // axios.defaults.headers.common[
          //   "Authorization"
          // ] = `Bearer ${res.headers.accesstoken}`;

          // //refreshToken 쿠키에 저장
          // setCookie("id", res.headers.refreshtoken, { path: "/" });
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
// const onSilentRefresh = () => {
//   axios
//     .post("/silent-refresh", data)
//     .then(onLoginSuccess)
//     .catch((error) => {
//       // ... 로그인 실패 처리
//     });
//   const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)
//   const onLoginSuccess = (response: any) => {
//     const { accessToken } = response.data;

//     // accessToken 설정
//     axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

//     // accessToken 만료하기 1분 전에 로그인 연장
//     setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
//   };
// };
