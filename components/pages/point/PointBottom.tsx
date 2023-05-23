import React from "react";
import style from "@/components/pages/point/PointBottom.module.css";
import LineSeparator from "@/components/ui/LineSeparator";

export default function pointBottom() {
  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          <div className={style.text}>
            <p>P 1500</p>
            <span>1,800</span>
          </div>
          <LineSeparator colorline="grayline" />
        </div>
        <div className={style.box}>
          <div className={style.text}>
            <p>P 3000</p>
            <span>3,200</span>
          </div>
          <LineSeparator colorline="grayline" />
        </div>
        <div className={style.box}>
          <div className={style.text}>
            <p>P 5000</p>
            <span>5,100</span>
          </div>
          <LineSeparator colorline="grayline" />
        </div>
        <div className={style.box}>
          <div className={style.text}>
            <p>P 5000</p>
            <span>5,100</span>
          </div>
          <LineSeparator colorline="grayline" />
        </div>
        <div className={style.box}>
          <div className={style.text}>
            <p>P 5000</p>
            <span>5,100</span>
          </div>
          <LineSeparator colorline="grayline" />
        </div>
      </div>
    </>
  );
}
