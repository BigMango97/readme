import Config from "@/configs/config.export";
import { loginCheckState, userDataState } from "@/state/loginState";
import axios from "axios";
import { default as customAxios } from "@/configs/axiosConfig";
//import { userLoginState } from "@/state/atom/userLoginState";

import { useRouter } from "next/router";
import { useEffect } from "react";

import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";

export default function Kakao() {
  const router = useRouter();
  const code = router.query.code;

  const [cookies, setCookie] = useCookies(["accessToken", "uuid"]);

  const [loginCheck, setLoginCheck] = useRecoilState(loginCheckState);
  //const [userData, setUserData] = useRecoilState(userDataState);

  // const code =
  //   "EqQphy6bHvQPes2YYcUzLcLpwPRNk1xb3I6lCw-MtZX_GTX8qR5R5BggV-r3a8pvAWOJ1wo9dRkAAAGIZUcVcw";

  useEffect(() => {
    if (code !== undefined) {
      axios
        .get(`https://api.readme.life/users-service/v1/user/login?code=${code}`)
        .then((res) => {
          localStorage.setItem("uuid", res.headers.uuid);
          localStorage.setItem("name", res.data.data.name);
          localStorage.setItem("age", res.data.data.age);

          console.log("headers = ", res.headers);
          console.log("accesssToken = ", res.headers.accesstoken);
          setCookie("accessToken", res.headers.accesstoken, {
            path: "/",
            // expires: res.headers.expires,
          });
          setCookie("uuid", res.headers.uuid, { path: "/" });

          const link = localStorage.getItem("link");
          if (link !== null) {
            router.push(link);
          }

          // if (link === "/mypage") {
          //   router.push(link);
          // }
          // if (link === "/library") {
          //   router.push("/library");
          // }

          // customAxios.defaults.headers.common[
          //   "Authorization"
          // ] = `Bearer ${res.headers.accesstoken}`;
          // customAxios.defaults.headers.common["uuid"] = `${res.headers.uuid}`;
        });
    }
  }, [code]);
}
