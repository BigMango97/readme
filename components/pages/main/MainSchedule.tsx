import React, { useState, useEffect } from "react";
import style from "@/components/pages/main/MainSchedule.module.css";
import NovelCard from "@/components/ui/NovelCard";
import { eventCardListType } from "@/types/eventDataType";
import axios from "axios";
export default function MainSchedule(props: { id: number; name: string }) {
  const [scheduleCard, setScheduleCard] = useState<eventCardListType[]>();
  useEffect(() => {
    axios
      .get(
        `http://43.200.189.164:8000/sections-service/v1/cards/novels/schedules?scheduleId=${props.id}`
      )
      .then((res) => {
        setScheduleCard(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.mainScheduleContainer}>
      <h3>{props.name}</h3>
      <div className={style.mainSchedule}>
        {scheduleCard &&
          scheduleCard.map((item) => {
            return (
              <NovelCard
              key={item.novelId}
                styleType="event"
                thumbnail={item.thumbnail}
                serializationStatus={item.serializationStatus}
                title={item.title}
                author={item.author}
                starRating={item.starRating}
                genre={item.genre}
              />
            );
          })}
      </div>
    </div>
  );
}
