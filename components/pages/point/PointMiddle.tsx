import React from "react";
import style from "@/components/pages/point/PointMiddle.module.css";
import LineSeparator from "@/components/ui/LineSeparator";

export default function PointMiddle() {
  return (
    <>
      <div className={style.container}>
        <div className={style.amount}>
          <LineSeparator colorline="grayline" />
          <p>충전 캐시 금액을 입력하세요</p>
          <span>50,000</span>
          <LineSeparator colorline="grayline" />
        </div>
        <div className={style.bottom}>
          <div className={style.box}>
            <p>P 10,000</p>
          </div>
          <div className={style.boxActive}>
            <p>P 15,000</p>
          </div>
          <div className={style.box}>
            <p>P 20,000</p>
          </div>
        </div>
      </div>
    </>
  );
}
