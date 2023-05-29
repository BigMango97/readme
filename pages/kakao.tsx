import Config from "@/configs/config.export";
import { loginCheckState, userDataState } from "@/state/loginState";
//import { userLoginState } from "@/state/atom/userLoginState";
import axios from "@/configs/axiosConfig";

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

  console.log(code);
  useEffect(() => {
    if (code !== undefined) {
      axios
        .get(`https://api.readme.life/users-service/v1/user/login?code=${code}`)
        .then((res) => {
          let myLogin = localStorage;
          //myLogin.setItem("accessToken", res.headers.accesstoken);
          myLogin.setItem("uuid", res.headers.uuid);
          myLogin.setItem("name", res.data.data.name);
          myLogin.setItem("age", res.data.data.age);

          setLoginCheck(true);
          console.log("login Res", res);

          setCookie("accessToken", res.headers.accesstoken, { path: "/" });
          setCookie("uuid", res.headers.uuid, { path: "/" });
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.headers.accesstoken}`;
          //router.push("/mypage");
        });
    }
  }, [code]);
}
