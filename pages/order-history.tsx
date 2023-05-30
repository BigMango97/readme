import axios from "@/configs/axiosConfig";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import style from "@/components/pages/point/Approval.module.css";
import Image from "next/image";
import LineSeparator from "@/components/ui/LineSeparator";

export default function OrderHistory() {
  const router = useRouter();
  const pg_token = router.query.pg_token;
  const [cookies] = useCookies(["uuid"]);

  console.log("pg_token1", pg_token);
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
          localStorage.removeItem("tid");
          localStorage.removeItem("partnerOrderId");
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
            <p>주문내역</p>
            <span>2023.05.26</span>
            <div className={style.box}>
              <p>100,00</p>
              <span>카카오페이</span>
            </div>

            <div className={style.textbox}>
              <p>충전한 포인트</p>
              <span>P 100,000</span>
            </div>
            <LineSeparator colorline="grayline" />
            <div className={style.textbox}>
              <p>보유 포인트</p>
              <span>P 100,000</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
