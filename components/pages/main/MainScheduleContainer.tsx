import { eventDataType } from "@/types/eventDataType";
import axios from "axios";
import React, { useState, useEffect } from "react";
import MainSchedule from "@/components/pages/main/MainSchedule";
import style from "@/components/pages/main/MainScheduleContainer.module.css";
export default function MainScheduleContainer() {
  const [scheduledata, setScheduleData] = useState<eventDataType[]>();
  const BaseUrl = "43.200.189.164:8000";
  useEffect(() => {
    axios
      .get(`http://${BaseUrl}/sections-service/v1/schedules`)
      .then((res) => {
        setScheduleData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={style.container}>
      {scheduledata &&
        scheduledata.map((item, index) => {
          return (
            <div key={item.id}>
              <MainSchedule id={item.id} name={item.name} />
            </div>
          );
        })}
    </div>
  );
}
