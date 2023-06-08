import axios from "axios";
import { default as customAxios } from "@/configs/axiosConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import style from "@/components/ui/Kakao.module.css";
import { SyncLoader } from "react-spinners";

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

          const link = sessionStorage.getItem("link");
          if (link === null) {
            router.push("/");
          } else {
            router.push(link);
          }
        });
    }
  }, [code]);

  return (
    <div className={style.container}>
      <SyncLoader color="#6E48EB" />
    </div>
  );
}
