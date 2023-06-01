import React, { useEffect, useState } from "react";
import style from "@/components/layouts/DetailFooter.module.css";
import Image from "next/image";
import isLogin from "@/configs/isLogin";
import { useRouter } from "next/router";
import Login from "@/pages/login";
import { useCookies } from "react-cookie";
import axios from "@/configs/axiosConfig";
import { likeType } from "@/types/user/libraryType";
export default function DetailFooter() {
  const [clickLike, setClickLike] = useState<boolean>(false);
  const [cookies] = useCookies(["accessToken", "uuid"]);

  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  const router = useRouter();
  const novelId = router.query.novelId;
  // useEffect(() => {
  //   setLoginCheck(cookies.accessToken);
  // }, []);
  useEffect(() => {
    setLoginCheck(cookies.accessToken);
    axios
      .get(`/utils-service/v1/pick`, {
        headers: {
          uuid: `${cookies.uuid}`,
        },
      })
      .then((res) => {
        // setUserLikeList({ likeList: res.data.data.contents });
        // userLikeList.likeList.map((item) => {
        //   if (item.novelsId === novelId) {
        //     return setClickLike(true);
        //   }
        // });
      });
  }, []);

  const likeBtnHandle = () => {
    setClickLike(!clickLike);
    axios
      .post(
        `/utils-service/v1/pick`,
        {
          novelsId: `${novelId}`,
        },
        {
          headers: {
            uuid: `${cookies.uuid}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className={style.detailFooter}>
      <div className={style.novelBuyBtn}>
        {loginCheck ? (
          <Image
            src={
              clickLike
                ? "/assets/images/icons/fillHeartBtn.svg"
                : "/assets/images/icons/blankHeartBtn.svg"
            }
            alt="logo"
            width={30}
            height={30}
            priority
            onClick={likeBtnHandle}
          />
        ) : (
          <Login />
        )}
      </div>
      <div className={style.novelReadBtn}>
        <Image
          src="/assets/images/icons/bookwhite.svg"
          alt="logo"
          width={30}
          height={30}
          priority
        />
        <div>무료로 첫편보기</div>
      </div>
    </div>
  );
}
