import React, { useEffect, useState } from "react";
import style from "@/components/pages/point/PointBottom.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { listAmountData } from "@/data/amountData";
import axios from "@/configs/axiosConfig";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { payState } from "@/state/payState";
import { useCookies } from "react-cookie";

export default function PointBottom() {
  const [cookies] = useCookies(["uuid"]);
  const [point, setPoint] = useRecoilState(payState);
  const clickMoney = () => {
    axios
      .post(`/payments-service/v1/payments/ready`, {
        point: point,
        uuid: cookies.uuid,
      })
      .then((res) => {
        localStorage.setItem("tid", res.data.data.tid);
        localStorage.setItem("partnerOrderId", res.data.data.partner_order_id);
        //console.log(res.data);
        const mobileCheck = isMobile();
        //console.log(mobileCheck);
        if (mobileCheck) {
          window.open(res.data.data.next_redirect_mobile_url);
        } else window.open(res.data.data.next_redirect_pc_url);
      });
  };

  const isMobile = () => {
    const user = navigator.userAgent;
    let isCheck = false;

    if (user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1) {
      isCheck = true;
    }

    return isCheck;
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          {listAmountData.map((item) => (
            <div key={item.id}>
              <div className={style.text} onClick={() => setPoint(item.point)}>
                <p>P {item.point}</p>
                <span>{item.amount.toLocaleString("en")}</span>
              </div>
              <LineSeparator colorline="grayline" />
            </div>
          ))}
        </div>
        <div className={style.payment}>
          <Image
            src="/assets/images/kakaopayBtn.png"
            alt="pay"
            width={115}
            height={45}
            onClick={() => clickMoney()}
          />
        </div>
      </div>
    </>
  );
}
