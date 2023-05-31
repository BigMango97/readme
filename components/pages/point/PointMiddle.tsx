import React, { useState } from "react";
import style from "@/components/pages/point/PointMiddle.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { buttonAmountData } from "@/data/amountData";
import { useRecoilState } from "recoil";
import { payState } from "@/state/payState";

export default function PointMiddle() {
  const [point, setPoint] = useRecoilState(payState);

  return (
    <>
      <div className={style.container}>
        <div className={style.amount}>
          <LineSeparator colorline="grayline" />
          <p>충전 캐시 금액을 클릭하세요</p>
          <span>{point.toLocaleString("en")}</span>
          <LineSeparator colorline="grayline" />
        </div>
      </div>
    </>
  );
}
