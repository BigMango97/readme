import React, { useState, useEffect } from "react";
import Image from "next/image";
import style from "@/components/pages/viewer/ViewerBottom.module.css";
import SlideComponent from "@/components/ui/SlideComponent";
import { viewerBottomMenu } from "@/datas/staticData";
import { useRecoilState } from "recoil";
import { shouldRefetchTotalRatingState } from "@/state/rating";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import axios from "@/configs/axiosConfig";
import ReadingProgressGraph from "@/components/ui/ReadingProgressGraph";
interface Props {
  novelId: number;
  title: string;
}


export default function ViewerBottom({ novelId, title }: Props) {
  const [shouldRefetchTotalRating, setShouldRefetchTotalRating] =
    useRecoilState(shouldRefetchTotalRatingState);
  const router = useRouter();
  const [activeIcon, setActiveIcon] = useState<
    "menu" | "reviewRating" | "comment" | "beforenovel" | "nextnovel" | null
  >(null);
  const [cookies] = useCookies(["uuid"]);
  const episodeId = router.query.episodeId;
  const isLoggedIn = !!cookies.uuid;

  const handleIconClick = (title: any) => {
    if (title === "reviewRating" && !isLoggedIn) {
      router.push("/login");
    } else {
      setActiveIcon(title);
    }
  };

  const closeSlide = () => {
    setActiveIcon(null);
  };

  const {
    data: rating,
    isError,
    refetch,
  } = useQuery(
    ["starRating", episodeId],
    () =>
      axios
        .get(`/utils-service/v1/starRating/episode/${episodeId}`, {
          headers: {
            uuid: cookies.uuid,
          },
        })
        .then((res) => res.data),
    { enabled: !!episodeId }
  );
  const totalStarRating = rating?.data?.starRating;

  useEffect(() => {
    if (shouldRefetchTotalRating) {
      refetch();
      setShouldRefetchTotalRating(false);
    }
  }, [setShouldRefetchTotalRating,refetch,shouldRefetchTotalRating]);

  return (
    <>
      <div className={style.container}>
        <ReadingProgressGraph/>
        <div className={style.menuCategory}>
          {viewerBottomMenu.map((item) => (
            <div
              className={style.viewerBottomIcon}
              key={item.id}
              onClick={() => handleIconClick(item.title)}
            >
              <Image
                src={item.iconUrl}
                alt={item.alt}
                width={item.width}
                height={item.height}
              />{" "}
              {item.title === "reviewRating" && (
                <div className={style.starRatingNumber}>{totalStarRating}</div>
              )}
            </div>
          ))}
        </div>
        <SlideComponent
          activeIcon={activeIcon}
          onClose={closeSlide}
          novelId={novelId}
          title={title}
        />
      </div>
    </>
  );
}
