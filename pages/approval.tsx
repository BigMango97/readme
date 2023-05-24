import { payState } from "@/state/payState";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function Approval() {
  const router = useRouter();
  const pg_token = router.query.pg_token;
  const [payData, setPayData] = useRecoilState(payState);

  console.log("pg_token", router.query.pg_token);
  useEffect(() => {
    if (pg_token !== undefined) {
      console.log("pg_token", pg_token);
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
  }, []);

  return <div>approval</div>;
}
