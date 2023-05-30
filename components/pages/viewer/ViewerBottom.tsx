import React, { useState } from "react";
import Image from "next/image";
import style from "@/components/pages/viewer/ViewerBottom.module.css";
import SlideComponent from "@/components/ui/SlideComponent";
import { viewerBottomMenu } from "@/datas/staticData";

interface Props{
  novelId:number,
}
export default function ViewerBottom({novelId}:Props) {
  const [activeIcon, setActiveIcon] = useState< "menu" | "reviewRating" | "comment" | "beforenovel" | "nextnovel" | null>(null);

  const handleIconClick = (title:any) => {
    setActiveIcon(title);
  };

  const closeSlide = () => {
    setActiveIcon(null);
  };

  return (
    <>
      <div className={style.container}>
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
        <SlideComponent activeIcon={activeIcon} onClose={closeSlide} novelId={novelId}/>
      </div>
    </>
  );
}
