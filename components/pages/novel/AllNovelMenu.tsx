import React, { useState, useEffect } from "react";
import style from "@/components/pages/novel/AllNovelMenu.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import { subDayMenu, subStatusMenu } from "@/datas/staticData";

interface novelMenuType {
  id: number;
  title: string;
}

export default function AllNovelMenu() {
  const [categoryMenus, setCategoryMenus] = useState<novelMenuType[]>([]);
  const router = useRouter();
  const { category, subCategory }: any = router.query;

  const selectmenuHandler = (index: string) => {
    {
      index == "요일"
        ? router.push(`/novel?category=${index}&subCategory=${"월"}`)
        : router.push(`/novel?category=${index}&subCategory=${"신작"}`);
    }
  };

  const selectsubHandler = (index: string, subindex: string) => {
    router.push(`/novel?category=${index}&subCategory=${subindex}`);
  };

  useEffect(() => {
    axios
      .get(`http://43.200.189.164:8000/novels-service/v1/main-category`)
      .then((res) => {
        setCategoryMenus(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className={style.novelMenuContainer}>
        <div className={style.novelMainMenu}>
          <div className={style.novelMenuTitle}>웹소설</div>
          <ul className={style.novelMenuList}>
            {categoryMenus.map((item) => (
              <li
                key={item.id}
                onClick={() => selectmenuHandler(item.title)}
                className={`${
                  category === item.title
                    ? style.novelMenuBoxActive
                    : style.novelMenuBox
                }`}
              >
                {item.title}
              </li>
            ))}
          </ul>
          <div />
        </div>
        <div className={style.novelSubMenu}>
          {category === "요일" ? (
            <ul className={style.novelSubMenuList}>
              {subDayMenu.map((item) => (
                <li
                  key={item.id}
                  onClick={() => selectsubHandler(category, item.title)}
                  className={`${
                    subCategory === item.title
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
                <li
                  key={item.id}
                  onClick={() => selectsubHandler(category, item.title)}
                  className={`${
                    subCategory === item.title
                      ? style.novelSubMenuBoxActive
                      : style.novelSubMenuBox
                  }`}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
