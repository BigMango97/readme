import React from "react";
import style from "@/components/pages/point/PointBottom.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { listAmountData } from "@/data/amountData";
import axios from "@/configs/axiosConfig";

export default function pointBottom() {
  const clickMoney = (point1: number) => {
    axios.get(`/users-service/v1/payments/ready`);
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          {listAmountData.map((item) => (
            <>
              <div
                className={style.text}
                onClick={() => clickMoney(item.point)}
              >
                <p>P {item.point}</p>
                <span>{item.amount.toLocaleString("en")}</span>
              </div>
              <LineSeparator colorline="grayline" />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
