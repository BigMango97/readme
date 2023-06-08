import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "@/components/pages/mypage/PointPurchased.module.css";
import axios from "@/configs/axiosConfig";
import { chargeHistoryType } from "@/types/user/mypageType";
import LineSeparator from "@/components/ui/LineSeparator";

export default function PointPurchased(props: {
  setMenuId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [historyData, setHistoryData] = useState<chargeHistoryType[]>();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `/payments-service/v1/payments/chargeHistory`
        );
        setHistoryData(res.data.data);
      } catch (err) {
        console.log("Error >>", err);
      }
    };
    getData();
  }, []);

  const clickClose = () => {
    props.setMenuId(0);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.historyTop}>
          <Image
            src={"/assets/images/icons/close.svg"}
            alt="close"
            width={45}
            height={45}
            onClick={() => clickClose()}
          />
          <div className={style.topText}>
            <p>충전 내역</p>
          </div>
        </div>
        {historyData?.map((item, idx) => (
          <div className={style.chargeInfo} key={idx}>
            <div className={style.textBox}>
              <p>충전 일자 </p>
              <p className={style.boldText}>{item.date.replace("T", " ")}</p>
            </div>
            <div className={style.textBox}>
              <p>충전 금액</p>
              <p className={style.boldText}>
                {item.price.toLocaleString("en")}
              </p>
            </div>
            <div className={style.textBox}>
              <p>충전 포인트</p>
              <p className={`${style.boldText} ${style.greenText}`}>
                P{item.price.toLocaleString("en")}
              </p>
            </div>
            <div className={style.line}>
              <LineSeparator colorline="grayline" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
