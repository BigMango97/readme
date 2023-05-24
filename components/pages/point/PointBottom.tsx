import React from "react";
import style from "@/components/pages/point/PointBottom.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { listAmountData } from "@/data/amountData";
import axios from "@/configs/axiosConfig";

export default function pointBottom() {
  //const uuid = localStorage.getItem("uuid");
  const clickMoney = (point: number) => {
    axios.post(`/users-service/v1/payments/ready`, {
      point: point,
      uuid: "11",
    });
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
                key={item.id}
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
