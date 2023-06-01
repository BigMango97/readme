import React from "react";
import style from "@/components/ui/ConfirmModal.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
export default function ConfirmModal(props: {
  color: string;
  situation: string;
  epiId: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  let textInfo = "";
  let confirmInfoTitle = "";
  let imageSrc = "";
  if (props.situation === "차감") {
    textInfo = "100P 차감됐습니다.";
    confirmInfoTitle = "읽기";
    imageSrc = "/assets/images/icons/bookwhite.svg";
  }
  if (props.situation === "부족") {
    textInfo = "포인트가 부족합니다~";
    confirmInfoTitle = "충전하기";
    imageSrc = "/assets/images/icons/plus.svg";
  }

  const movePage = () => {
    if (props.situation === "차감") {
      router.push(`/viewer/${props.epiId}`);
    }
    //부족
    else router.push(`/pointCharge`);
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
