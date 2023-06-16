import React from "react";
import style from "@/components/ui/ConfirmModal.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "@/configs/axiosConfig";
import { useCookies } from "react-cookie";
export default function ConfirmModal(props: {
  color: string;
  situation: "부족" | "결제";
  epiId: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [cookies] = useCookies(["uuid"]);
  let textInfo = "";
  let confirmInfoTitle = "";
  let imageSrc = "";
  if (props.situation === "결제") {
    textInfo = "100P를 사용하시겠습니까?";
    confirmInfoTitle = "읽기";
    imageSrc = "/assets/images/icons/bookwhite.svg";
  }
  if (props.situation === "부족") {
    textInfo = "포인트가 부족합니다.";
    confirmInfoTitle = "충전하기";
    imageSrc = "/assets/images/icons/plus.svg";
  }
  const paymentHandle = async () => {
    const res = await axios.post(`/payments-service/v1/payments/purchase`, {
      uuid: cookies.uuid,
      episodeId: props.epiId,
    });

    // const userPoint = Number(sessionStorage.getItem("point"));
    // const afterPoint = userPoint - 100;
    // sessionStorage.setItem("point", afterPoint.toString());
  };
  const movePage = () => {
    if (props.situation === "결제") {
      paymentHandle();
      props.setIsModalOpen(false);
      router.push(`/viewer/${props.epiId}`);
    }
    //부족
    else {
      localStorage.setItem("link", router.asPath);
      router.push(`/pointCharge`);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.confirmTotalContainer}>
        <div className={style.closeBtn}>
          <Image
            src="/assets/images/icons/close.svg"
            alt="left-arrow"
            width={30}
            height={30}
            onClick={() => props.setIsModalOpen(false)}
          />
        </div>
        <div className={style.containerInfo}>
          <p className={`${style.textInfo} ${style[props.color + "Text"]}`}>
            {textInfo}
          </p>
          <div
            className={`${style.confirmInfo}  ${style[props.color]}`}
            onClick={movePage}
          >
            <div className={style.confirmBtn}>
              <Image src={imageSrc} alt="left-arrow" width={20} height={20} />
            </div>
            <p className={style.confirmInfoTitle}>{confirmInfoTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
