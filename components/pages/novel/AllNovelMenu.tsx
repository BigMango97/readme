import React from "react";
import style from "@/components/pages/novel/AllNovelMenu.module.css";
import { useRouter } from "next/router";
import { subDayMenu, subStatusMenu } from "@/datas/staticData";
import { viewerTypeState } from "@/state/viewerType";
import { useRecoilState } from "recoil";
interface novelMenuType {
  id: number;
  title: string;
}

export default function AllNovelMenu(props: { data: novelMenuType[] }) {
  const router = useRouter();
  const { category, subCategory }: any = router.query;
  const [viewerType, setViewerType] = useRecoilState(viewerTypeState);
  const selectmenuHandler = (index: string) => {
    {
      index == "요일"
        ? router.push(
            `/novel?category=${index}&subCategory=${"월"}&viewerType=${viewerType}`,
            undefined,
            { shallow: true }
          )
        : router.push(
            `/novel?category=${index}&subCategory=${"신작"}&viewerType=${viewerType}`,
            undefined,
            { shallow: true }
          );
    }
  };

  const selectsubHandler = (index: string, subindex: string) => {
    router.push(
      `/novel?category=${index}&subCategory=${subindex}&viewerType=${viewerType}`,
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <div className={style.novelMenuContainer}>
        <div className={style.novelMainMenu}>
          <div className={style.novelMenuTitle}>웹소설</div>
          <ul className={style.novelMenuList}>
            {props.data.map((item) => (
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
