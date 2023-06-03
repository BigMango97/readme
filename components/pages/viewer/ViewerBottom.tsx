import React, { useState } from "react";
import Image from "next/image";
import style from "@/components/pages/viewer/ViewerBottom.module.css";
import SlideComponent from "@/components/ui/SlideComponent";
import { viewerBottomMenu } from "@/datas/staticData";
import { useRecoilValue } from "recoil";
import { pageState, totalPagesState } from "@/state/Page";
interface Props {
  novelId: number;
  title: string;
}
export default function ViewerBottom({ novelId, title }: Props) {
  const [activeIcon, setActiveIcon] = useState<
    "menu" | "reviewRating" | "comment" | "beforenovel" | "nextnovel" | null
  >(null);

  const handleIconClick = (title: any) => {
    setActiveIcon(title);
  };

  const closeSlide = () => {
    setActiveIcon(null);
  };
  const currentPage = useRecoilValue(pageState);
  const totalPages = useRecoilValue(totalPagesState);
  return (
    <>
      <div className={style.container}>
        <div className={style.pageNumberContainer}>
          {currentPage}/{totalPages}
        </div>
        <div className={style.menuCategory}>
          {viewerBottomMenu.map((item) => (
            <div
              className={style.viewerBottomIcon}
              key={item.id}
              onClick={() => handleIconClick(item.title)}
            >
              <Image
                src={item.iconUrl}
                alt={item.alt}
                width={item.width}
                height={item.height}
              />
            </div>
          ))}
        </div>
        <SlideComponent
          activeIcon={activeIcon}
          onClose={closeSlide}
          novelId={novelId}
          title={title}
        />
      </div>
    </>
  );
}
