import React, { useState } from "react";
import style from "@/components/pages/novel/AllNovelMenu.module.css";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
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
  const [categorySubMenu, setCategorySubMenu] = useState<novelSubMenuType[]>(
    []
  );
  const router = useRouter();
  console.log("router", router.query.categoryId);

  //메인카테고리
  useEffect(() => {
    axios
      .get(`http://43.200.189.164:8000/novels-service/v1/main-category`)
      .then((res) => {
        console.log("res", res.data.data);
        setCategoryMenus(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 하위카테고리
  useEffect(() => {
    {
      const BaseUrl = process.env.baseApiUrl;

      if (router.query.categoryId !== undefined) {
        axios
          .get(
            `http://43.200.189.164:8000/novels-service/v1/sub-category?mainCategoryId=${Number(
              router.query.categoryId
            )}`
          )
          .then((res) => {
            console.log("res", res.data.data);
            setCategorySubMenu(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [router.query]);

  const selectmenuHandler = (index: number, subInitId: number) => {
    router.push(`/novel/${index}/${subInitId}`);
  };
  const selectSubmenuHandler = (index: any) => {
    router.push(`/novel/${router.query.categoryId}/${index}`);
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
                onClick={() => {
                  selectmenuHandler(item.id, categorySubMenu[0].id);
                }}
              >
                {item.title}
              </li>
            ))}
          </ul>
          <div />
        </div>
      </div>
      <div className={style.novelSubMenu}>
        <ul className={style.novelSubMenuList}>
          {categorySubMenu.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                selectSubmenuHandler(item.id);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
