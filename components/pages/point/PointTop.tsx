import React from "react";
import style from "@/components/pages/point/PointTop.module.css";
import Image from "next/image";

export default function PointTop() {
  return (
    <>
      <div className={style.container}>
        <div className={style.top}>
          <p>충전하기</p>
          <div className={style.closeButton}>
            <Image
              src="/assets/images/icons/close.svg"
              alt="close"
              width={30}
              height={30}
              priority
            />
          </div>
        </div>
        <div className={style.middle}>
          <p>보유포인트</p>
          <span>P 895,000</span>
        </div>
        <div className={style.bottom}>
          <Image
            src="/assets/images/wallet.png"
            alt="close"
            width={60}
            height={60}
            priority
          />
          <Image
            src="/assets/images/switch.png"
            alt="close"
            width={60}
            height={60}
            priority
          />
          <Image
            src="/assets/images/cash.png"
            alt="close"
            width={60}
            height={60}
            priority
          />
          <Image
            src="/assets/images/qr.png"
            alt="close"
            width={60}
            height={60}
            priority
          />
        </div>
      </div>
    </>
  );
}
