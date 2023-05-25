import React from "react";
import style from "@/components/pages/noveldetail/ViewerPage.module.css";
import Image from "next/image";
export default function ViewerPage() {
  return (
    <div className={style.container}>
      <div className={style.topContainer}>
        <div>
          <Image
            src={"/assets/images/icons/NewIcon.svg"}
            alt={"이미지"}
            width={30}
            height={30}
          />
        </div>
        <div>계약 결혼은 미친 짓</div>
      </div>
    </div>
  );
}
