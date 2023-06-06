import React from "react";
import { BeatLoader } from "react-spinners";
import style from "@/components/ui/Loading.module.css";
export default function Loading() {
  return (
    <div className={style.logingCantainer}>
      <BeatLoader color="#36d7b7" />
    </div>
  );
}
