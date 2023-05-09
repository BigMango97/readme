import React, { useState } from "react";
import style from "@/components/pages/novel/AllNovelMenu.module.css";
import { useEffect } from "react";
import axios from "axios";
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
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const [currentSubMenu, setCurrentSubMenu] = useState<number>(0);
  const [categoryMenus, setCategoryMenus] = useState<novelMenuType[]>([]);
  const [categorySubMenu, setCategorySubMenu] = useState<novelSubMenuType[]>(
    []
  );
  //메인카테고리
  useEffect(() => {
    axios
      .get(`http://10.10.10.125:8000/novels-service/v1/main-category`)
      .then((res) => {
        setCategoryMenus(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //하위카테고리
  useEffect(() => {
    {
      const BaseUrl = process.env.baseApiUrl;
      axios
        .get(
          `http://10.10.10.125:8000/novels-service/v1/sub-category?mainCategoryId=${
            currentMenu + 1
          }`
        )
        .then((res) => {
          setCategorySubMenu(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentMenu]);

  const selectmenuHandler = (index: number) => {
    setCurrentMenu(index);
  };
  const selectSubmenuHandler = (index: any) => {
    setCurrentSubMenu(index);
  };
  return (
    <>
      <div className={style.novelMenuContainer}>
        <div className={style.novelMainMenu}>
          <div className={style.novelMenuTitle}>웹소설</div>
          <ul className={style.novelMenuList}>
            {categoryMenus.map((item, i) => (
              <li
                className={`${
                  currentMenu === i ? style.novelMenuBoxActive : null
                }`}
                key={item.id}
                onClick={() => selectmenuHandler(i)}
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
          {categorySubMenu.map((item, i) => (
            <li
              className={`${
                currentSubMenu === i ? style.novelSubMenuBoxActive : null
              }`}
              key={item.id}
              onClick={() => selectSubmenuHandler(i)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
