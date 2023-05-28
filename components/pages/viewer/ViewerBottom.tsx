import React, { useState } from "react";
import Image from "next/image";
import style from "@/components/pages/viewer/ViewerBottom.module.css";
import SlideComponent from "@/components/ui/SlideComponent";
import { viewerBottomMenu } from "@/datas/staticData";

export default function ViewerBottom() {
  const [activeIcon, setActiveIcon] = useState<null | undefined | string>(null);

  const handleIconClick = (title: string) => {
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
        <SlideComponent activeIcon={activeIcon} onClose={closeSlide} />
      </div>
    </>
  );
}
