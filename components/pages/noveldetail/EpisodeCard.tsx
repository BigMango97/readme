import React, { useEffect, useState } from "react";
import style from "@/components/pages/noveldetail/EpisodeCard.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import NewUi from "@/components/ui/NewUi";
import Image from "next/image";
import axios from "@/configs/axiosConfig";
import { useRouter } from "next/router";
import { recentReadType } from "@/types/user/libraryType";

export default function EpisodeCard(props: {
  id: number;
  name: string;
  free: boolean;
  registrationDate: string;
  starRating: number;
  new: boolean;
}) {
  const router = useRouter();
  const { novelId } = router.query;
  const [readCheck, setReadCheck] = useState<recentReadType>();
  const getData = async () => {
    const res = await axios.get(`/novels-service/v1/history/novel/${novelId}`);
    const check = res.data.data.find(
      (item: recentReadType) => item.episodeId === props.id
    );
    console.log(res);
    setReadCheck(check);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={style.episodeCard}>
        <div className={style.episodeCardInfo}>
          <div className={style.episodeCardDescription}>
            <div className={style.episodeCardTitleNew}>
              <div
                className={
                  readCheck ? style.episodeTitle : style.episodeTitleActive
                }
              >
                {props.name}
              </div>
              {props.new && <NewUi />}
            </div>
            <div className={style.episodeDayFree}>
              <div className={style.episodeDay}>{props.registrationDate}</div>
              {props.free ? (
                <div>무료</div>
              ) : (
                <div className={style.episodeNotFree}>
                  <Image
                    src="/assets/images/icons/point.svg"
                    alt="pointIcon"
                    width={15}
                    height={15}
                  ></Image>
                  <p>100</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <LineSeparator colorline="grayline" />
    </>
  );
}
