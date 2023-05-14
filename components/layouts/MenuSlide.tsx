import React from "react";
import style from "@/components/layouts/MenuSlide.module.css";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
type Props = {
  onClose: () => void;
};
export default function MenuSlide(props: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
    props.onClose();
  };

  return (
    <>
      {isOpen && (
        <div className={style.container}>
          <div className={style.blackContainer} onClick={handleClose}></div>
          <div className={style.menuList}>
            <div className={style.menuListHeader} onClick={handleClose}>
              <Image
                src="/assets/images/icons/close.svg"
                alt="logo"
                width={50}
                height={50}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
