import axios from "@/configs/axiosConfig";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import style from "@/components/pages/point/Approval.module.css";
import Image from "next/image";
import LineSeparator from "@/components/ui/LineSeparator";
import { pointPayType } from "@/types/paymentType";
import dayjs from "dayjs";

export default function OrderHistory() {
  const router = useRouter();
  const pg_token = router.query.pg_token;
  const [cookies] = useCookies(["uuid"]);
  const [payData, setPayData] = useState<pointPayType>({
    total: 0,
    point: 0,
    chargeDate: new Date().toISOString().substring(0, 10),
  });

  useEffect(() => {
    const tid = localStorage.getItem("tid");
    const uuid = localStorage.getItem("uuid");
    const partnerOrderId = localStorage.getItem("partnerOrderId");
    if (pg_token !== undefined) {
      axios
        .post(`/payments-service/v1/payments/approve`, {
          tid: tid,
          partnerOrderId: partnerOrderId,
          uuid: cookies.uuid,
          pgToken: pg_token,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.removeItem("tid");
          localStorage.removeItem("partnerOrderId");

          const data = JSON.parse(res.data.replace("data:", ""));
          console.log(data.body.data);
          setPayData({
            total: data.body.data.total,
            point: data.body.data.point,
            chargeDate: data.body.data.chargeDate,
          });
        });
    }
  }, [pg_token]);

  return (
    <>
      <div className={style.container}>
        <div className={style.billArea}>
          <Image
            src="/assets/images/icons/greenCheck.svg"
            alt="pay"
            width={80}
            height={80}
          />
          <div className={style.bill}>
            <div className={style.content}>
              <div className={style.top}>
                <p>주문내역</p>
                <span>{payData.chargeDate}</span>
              </div>

              <div className={style.box}>
                <p>{payData.point}</p>
                <span>카카오페이</span>
              </div>

              <div className={style.textbox}>
                <p>충전한 포인트</p>
                <span>P {payData.point.toLocaleString("en")}</span>
              </div>

              <LineSeparator colorline="grayline" />
              <div className={style.textbox}>
                <p>보유 포인트</p>
                <span className={`${style["purple"]}`}>
                  P {payData.total.toLocaleString("en")}
                </span>
              </div>
              <div className={style.bottom} onClick={() => router.push("/")}>
                <p>Go Back To Home</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
