import React from "react";
import style from "@/components/pages/main/MainSchedule.module.css";
import NovelCardItem from "@/components/ui/NovelCardItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import { mainScheduleFetch } from "@/pages/api/sections-service";

export default function MainSchedule(props: { id: number; name: string }) {
  const mainScheduleQuery = useQuery(
    ["mainScheduleData", { id: props.id, name: props.name }],
    () =>
      mainScheduleFetch({
        queryKey: ["mainScheduleData", { id: props.id, name: props.name }],
      })
  );
  const scheduleResultData = mainScheduleQuery.data;

  const settings = {
    infinite: true,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    speed: 1500,
    arrows: true,
  };

  return (
    <div className={style.mainScheduleContainer}>
      <h3>{props.name}</h3>

      <div className={style.mainSchedule}>
        <Slider {...settings}>
          {scheduleResultData &&
            scheduleResultData.map((item: any) => (
              <NovelCardItem
                key={item.novelId}
                thumbnail={item.thumbnail}
                serializationStatus={item.serializationStatus}
                title={item.title}
                author={item.author}
                starRating={item.starRating}
                genre={item.genre}
                novelId={item.novelId}
                grade={item.grade}
                newChecking={item.newChecking}
                episodeCount={item.episodeCount}
                imgSize="100%"
              />
            ))}
        </Slider>
      </div>
    </div>
  );
}
