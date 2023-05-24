import React from "react";
import style from "@/components/pages/point/PointBottom.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { listAmountData } from "@/data/amountData";
import axios from "@/configs/axiosConfig";
import { useRecoilState } from "recoil";
import { payState } from "@/state/payState";

export default function pointBottom() {
  //const uuid = localStorage.getItem("uuid");
  const [payData, setPayData] = useRecoilState(payState);
  const clickMoney = (point: number) => {
    axios
      .post(`/payments-service/v1/payments/ready`, {
        point: point,
        uuid: "11",
      })
      .then((res) => {
        console.log(res);
        setPayData({
          tid: res.data.data.tid,
          partnerOrderId: res.data.data.partner_order_id,
        });
        window.open(res.data.data.next_redirect_pc_url);

        // axios.post(`/payments-service/v1/payments/approve`, {
        //   partner_order_id: res.data.data.partner_order_id,
        //   tid: res.data.data.tid,
        // });
        // res.data.data
        // partner_order_id
        // tid
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
