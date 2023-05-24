import React from "react";
import style from "@/components/pages/point/PointBottom.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { listAmountData } from "@/data/amountData";
import axios from "@/configs/axiosConfig";

export default function PointBottom() {
  //const uuid = localStorage.getItem("uuid");

  const clickMoney = (point: number) => {
    axios
      .post(`/payments-service/v1/payments/ready`, {
        point: point,
        uuid: "11",
      })
      .then((res) => {
        console.log(res.data.data.tid);

        localStorage.setItem("tid", res.data.data.tid);
        localStorage.setItem("partnerOrderId", res.data.data.partner_order_id);
        window.open(res.data.data.next_redirect_pc_url);
      });
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          {" "}
          {listAmountData.map((item) => (
            <div key={item.id}>
              <div
                className={style.text}
                onClick={() => clickMoney(item.point)}
              >
                <p>P {item.point}</p>
                <span>{item.amount.toLocaleString("en")}</span>
              </div>
              <LineSeparator colorline="grayline" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
