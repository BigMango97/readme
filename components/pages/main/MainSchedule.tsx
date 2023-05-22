import React, { useState, useEffect } from "react";
import style from "@/components/pages/main/MainSchedule.module.css";
import NovelCardItem from "@/components/ui/NovelCardItem";
import { eventCardListType } from "@/types/eventDataType";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainSchedule(props: { id: number; name: string }) {
  const [scheduleCard, setScheduleCard] = useState<eventCardListType[]>([]);
  const settings = {
    infinite: true, //무한 반복 옵션
    autoplay: true, //자동플레이
    slidesToShow: 2, // 한 화면에 보여질 컨텐츠 개수
    slidesToScroll: 2, //스크롤 한번에 움직일 컨텐츠 개수
    speed: 1000, // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
    arrows: true, // 옆으로 이동하는 화살표 표시 여부
    dots: true, // 스크롤바 아래 점으로 페이지네이션 여부
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://43.200.189.164:8000/sections-service/v1/cards/novels/schedules?scheduleId=${props.id}`
        );
        setScheduleCard(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props.id]);
  return (
    <div className={style.mainScheduleContainer}>
      <h3>{props.name}</h3>

      <div className={style.mainSchedule}>
        <Slider {...settings}>
          {scheduleCard &&
            scheduleCard.map((item) => (
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
              />
            ))}
        </Slider>
      </div>
    </div>
  );
}
