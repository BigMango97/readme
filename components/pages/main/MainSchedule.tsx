import React, { useState, useEffect } from "react";
import style from "@/components/pages/main/MainSchedule.module.css";
import NovelCard from "@/components/ui/NovelCard";
import { eventDataType } from "@/types/eventDataType";
import axios from "axios";

export default function MainSchedule() {
  const [data, setData] = useState<eventDataType[]>([]);
  const BaseUrl = '43.200.189.164:8000'
  useEffect(() => {
    axios
      .get(`http://${BaseUrl}/sections-service/v1/schedules`)
      .then((res) => {
        console.log('res',res)
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log('data',data);
  return (
    <div className={style.mainScheduleContainer}>
      <h3>밀리언페이지</h3>
      <div className={style.mainSchedule}>
        <NovelCard styleType="event" />
        <NovelCard styleType="event" />
        <NovelCard styleType="event" />
        <NovelCard styleType="event" />
        <NovelCard styleType="event" />
      </div>
    </div>
  );
}
