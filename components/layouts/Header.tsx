import Image from "next/image";
import React from "react";
import style from "@/components/layouts/Header.module.css";
import MenuSlide from "@/components/layouts/MenuSlide";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState } from "react";
export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <header className={style.mainHeader}>
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        from ='right'
        width='85%'
        isOpen={isOpen}
        hideHeader={true}
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <>
        <MenuSlide isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      </SlidingPane>
      <div className={style.logo}>
        <h1>readme</h1>
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={360}
          height={102}
          priority
        />
      </div>
      <div className={style.mobileMenu} onClick={()=>setIsOpen(true)}>
        <Image
          src="/assets/images/icons/menu-white.svg"
          alt="menuIcon"
          width={72}
          height={72}
          priority
        />
      </div>
    </header>
  );
}
