import React, { useState } from "react";
import style from "@/components/pages/point/PointMiddle.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { buttonAmountData } from "@/data/amountData";
import { useRecoilState } from "recoil";
import { payState } from "@/state/payState";

export default function PointMiddle() {
  const [clickAmount, setClickAmount] = useState(2);
  //const [cash, setCash] = useState(15000);
  const [point, setPoint] = useRecoilState(payState);
  // const clickButton = (id: number, amount: number) => {
  //   setClickAmount(id);
  //   setCash(amount);
  // };
  return (
    <>
      <div className={style.container}>
        <div className={style.amount}>
          <LineSeparator colorline="grayline" />
          <p>충전 캐시 금액을 클릭하세요</p>
          <span>{point.toLocaleString("en")}</span>
          <LineSeparator colorline="grayline" />
        </div>
        {/* <div className={style.bottom}>
          {buttonAmountData.map((item) => (
            <div
              key={item.id}
              className={clickAmount === item.id ? style.boxActive : style.box}
              onClick={() => clickButton(item.id, item.amount)}
            >
              <p>P {item.amount.toLocaleString("en")}</p>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
}
