import { eventDataType } from "@/types/eventDataType";
import React from "react";
import MainSchedule from "@/components/pages/main/MainSchedule";
import style from "@/components/pages/main/MainScheduleContainer.module.css";
export default function MainScheduleContainer(props:{data:eventDataType[]}) {

  return (
    <div className={style.container}>
      {props.data &&
        props.data.map((item) => (
          <div key={item.id}>
            <MainSchedule id={item.id} name={item.name} />
          </div>
        ))}
    </div>
  );
}
