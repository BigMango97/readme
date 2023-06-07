import Image from "next/image";
import React from "react";
import style from "@/components/layouts/Header.module.css";
import MenuSlide from "@/components/layouts/MenuSlide";
import { useState } from "react";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (event: any) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <header className={style.mainHeader}>
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
      <div className={style.mobileMenu}>
        <Image
          src="/assets/images/icons/menu-white.svg"
          alt="menuIcon"
          width={72}
          height={72}
          priority
          onClick={toggleMenu}
        />
      </div>
      {isOpen && <MenuSlide onClose={handleClose} />}
    </header>
  );
}
