import React, { useState } from "react";
import style from "@/components/pages/novel/AllNovelMenu.module.css";

interface novelMenuType {
  id: number;
  title: string;
  submenu: novelSunMenuType[];
}
interface novelSunMenuType {
  id: number;
  subtitle: string;
}
export default function AllNovelMenu() {
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const [currentsSubMenu, setCurrentSubMenu] = useState<novelSunMenuType[]>([]);
  const menuList: novelMenuType[] = [
    {
      id: 0,
      title: "전체",
      submenu: [
        { id: 0, subtitle: "신작" },
        { id: 1, subtitle: "연재중" },
        { id: 2, subtitle: "완결" },
      ],
    },
    {
      id: 1,
      title: "장르",
      submenu: [
        { id: 0, subtitle: "판타지" },
        { id: 1, subtitle: "현판" },
        { id: 2, subtitle: "로맨스" },
        { id: 3, subtitle: "로판" },
        { id: 4, subtitle: "무협" },
        { id: 5, subtitle: "드라마" },
      ],
    },
    {
      id: 2,
      title: "요일",
      submenu: [
        { id: 0, subtitle: "월" },
        { id: 1, subtitle: "화" },
        { id: 2, subtitle: "수" },
        { id: 3, subtitle: "목" },
        { id: 4, subtitle: "금" },
        { id: 5, subtitle: "토" },
        { id: 6, subtitle: "일" },
      ],
    },
  ];
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
            {menuList.map((item, i) => (
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
          <li className={style.novelSubMenuBoxActive}>신작</li>
          <li className={style.novelSubMenuBox}>연재중</li>
          <li className={style.novelSubMenuBox}>완결</li>
        </ul>
      </div>
    </>
  );
}
