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

  useEffect(() => {
    if (code !== undefined) {
      axios
        .post(
          `https://api.readme.life/users-service/v1/user/login?code=${code}`
        )
        .then((res) => {
          //localStorage.setItem("name", res.data.data.name);
          sessionStorage.setItem("nickname", res.data.data.nickname);
          sessionStorage.setItem("point", res.data.data.point);
          sessionStorage.setItem("profileImg", res.data.data.profileImg);
          sessionStorage.setItem("age", res.data.data.age_range);

          console.log("headers = ", res.headers);
          // console.log("res = ", res);
          // console.log("res.data = ", res.data);
          // console.log("accesssToken = ", res.headers.accesstoken);
          setCookie("accessToken", res.headers.accesstoken, {
            path: "/",
            // expires: res.headers.expires,
          });
          setCookie("uuid", res.headers.uuid, { path: "/" });

          const link = localStorage.getItem("link");
          if (link === null) {
            router.push("/");
          } else {
            router.push(link);
          }
        });
    }
  }, [code]);
}
