import React, { useState } from "react";
import style from "@/components/pages/novel/AllNovelMenu.module.css";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { subDayMenu, subStatusMenu } from "@/datas/staticData";

interface novelMenuType {
  id: number;
  title: string;
}
interface novelSubMenuType {
  id: number;
  title: string;
  mainCategoryId: number;
  mainCategoryTitle: string;
}
export default function AllNovelMenu() {
  const [categoryMenus, setCategoryMenus] = useState<novelMenuType[]>([]);
  const router = useRouter();
  console.log("router", router);
  const { categoryId, subcategoryId }: any = router.query;
  //메인카테고리
  useEffect(() => {
    axios
      .get(`http://43.200.189.164:8000/novels-service/v1/main-category`)
      .then((res) => {
        setCategoryMenus(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const selectmenuHandler = (index: string, subindex: string) => {
    {
      index == "요일"
        ? router.push(`/novel?categoryId=${index}&subcategoryId=${"월"}`)
        : router.push(`/novel?categoryId=${index}&subcategoryId=${"신작"}`);
    }
  };

  const selectsubHandler = (index: string, subindex: string) => {
    router.push(`/novel?categoryId=${index}&subcategoryId=${subindex}`);
  };
  return (
    <>
      <div className={style.novelMenuContainer}>
        <div className={style.novelMainMenu}>
          <div className={style.novelMenuTitle}>웹소설</div>
          <ul className={style.novelMenuList}>
            {categoryMenus.map((item, i) => (
              <li
                key={item.id}
                onClick={() => selectmenuHandler(item.title, item.title)}
                className={`${
                  categoryId === item.title ? style.novelMenuBoxActive : null
                }`}
              >
                {item.title}
              </li>
            ))}
          </ul>
          <div />
        </div>
      </div>
      <div className={style.novelSubMenu}>
        {categoryId === "요일" ? (
          <ul className={style.novelSubMenuList}>
            {subDayMenu.map((item) => (
              <li
                key={item.id}
                onClick={() => selectsubHandler(categoryId, item.title)}
                className={`${
                  subcategoryId === item.title
                    ? style.novelSubMenuBoxActive
                    : style.novelSubMenuBox
                }`}
              >
                {item.title}
              </li>
            ))}
          </ul>
        ) : (
          <ul className={style.novelSubMenuList}>
            {subStatusMenu.map((item) => (
              <>
                <li
                  key={item.id}
                  onClick={() => selectsubHandler(categoryId, item.title)}
                  className={`${
                    subcategoryId === item.title
                      ? style.novelSubMenuBoxActive
                      : style.novelSubMenuBox
                  }`}
                >
                  {item.title}
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
