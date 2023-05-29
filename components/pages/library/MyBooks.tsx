import React, { useEffect, useState } from "react";
import style from "@/components/pages/library/MyBooks.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { likeListType } from "@/types/user/likeType";
export default function MyBooks() {
  const [cookies] = useCookies(["uuid"]);
  const [likeList, setLikeList] = useState<likeListType>();
  useEffect(() => {
    console.log(cookies.uuid);
    axios
      .get(`/utils-service/v1/pick`, {
        headers: {
          //Authorization: `Bearer ${cookies.}`,
          uuid: `${cookies.uuid}`,
        },
      })
      .then((res) => {
        console.log(res);
        //setLikeList({})
      });
  }, []);
  return (
    <div className={style.container}>
      <p>최근 본 소설이 없습니다</p>
    </div>
  );
}
