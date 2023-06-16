import React from "react";
import MainSchedule from "@/components/pages/main/MainSchedule";
import style from "@/components/pages/main/MainScheduleContainer.module.css";
import { scheduleQueryType } from "@/types/service/section-service";
interface MainScheduleContainerProps {
  data: scheduleQueryType[];
}

export default function MainScheduleContainer({
  data,
}: MainScheduleContainerProps) {
  return (
    <div className={style.container}>
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <MainSchedule id={item.id} name={item.name} />
          </div>
        ))}
    </div>
  );
}
