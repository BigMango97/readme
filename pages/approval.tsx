import { payState } from "@/state/payState";
import axios from "@/configs/axiosConfig";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Approval() {
  const router = useRouter();
  const pg_token = router.query.pg_token;

  console.log("pg_token1", pg_token);
  useEffect(() => {
    // const tid = localStorage.getItem("tid");
    // const partnerOrderId = localStorage.getItem("partnerOrderId");
    const payData = useRecoilValue(payState);

    if (pg_token !== undefined) {
      console.log("pg_token2", pg_token);
      console.log("payData.tid", payData.tid);
      console.log("payData.partnerOrderId", payData.partnerOrderId);
      axios
        .post(`/payments-service/v1/payments/approve`, {
          tid: payData.tid,
          partnerOrderId: payData.partnerOrderId,
          uuid: "11",
          pgToken: pg_token,
        })
        .then((res) => {
          console.log(res);
        });
    }
  }, [pg_token]);

  return <div>approval</div>;
}
