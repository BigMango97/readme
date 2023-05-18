import React from "react";
import style from "@/components/ui/ConfirmModal.module.css";
import Image from "next/image";
export default function ConfirmModal() {
  return (
    <div className={style.container}>
      <div className={style.confirmTotalContainer}>
        <div className={style.closeBtn}>
          <Image
            src="/assets/images/icons/close.svg"
            alt="left-arrow"
            width={30}
            height={30}
          />
        </div>
        <div className={style.containerInfo}>
          <p className={style.textInfo}>포인트가 부족합니다~</p>
          <div className={style.confirmInfo}>
            <div className={style.confirmBtn}>
              <Image
                src="/assets/images/icons/bookwhite.svg"
                alt="left-arrow"
                width={20}
                height={20}
              />
            </div>
            <p className={style.confirmInfoTitle}>읽기</p>
          </div>
        </div>
      </div>
    </div>
  );
}
