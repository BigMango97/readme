import React, { useCallback, useEffect, useState } from "react";
import style from "@/components/layouts/DetailFooter.module.css";
import Image from "next/image";

import { useRouter } from "next/router";

import Login from "@/pages/login";
import { useCookies } from "react-cookie";
import axios from "@/configs/axiosConfig";
import { useRouter } from "next/router";
export default function DetailFooter() {
  const [clickLike, setClickLike] = useState<boolean>(false);
  const [cookies] = useCookies(["uuid"]);

  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { novelId } = router.query;

  const getLike = useCallback(async () => {
    if (novelId) {
      const res = await axios.get(`/utils-service/v1/pick/${novelId}`);
      if (res.data.data.checked === true) setClickLike(true);
      else setClickLike(false);
    }

    //console.log("res.data.data.checked", res.data.data.checked);
  }, [novelId]);

  useEffect(() => {
    if (cookies.uuid) {
      setLoginCheck(true);
      getLike();
    } else {
      setLoginCheck(false);
    }
  }, [novelId]);

  const likeBtnHandle = async () => {
    //login 돼있을 때
    if (loginCheck) {
      setClickLike(!clickLike);
      const res = axios.post(`/utils-service/v1/pick`, {
        novelsId: `${novelId}`,
      });
      console.log(res);
    } else {
      sessionStorage.setItem("/link", router.asPath);
      router.push("/login");
    }
  };

  return (
    <div className={style.detailFooter}>
      <div className={style.novelBuyBtn}>
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
