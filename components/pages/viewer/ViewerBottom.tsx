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
import ConfirmModal from "@/components/ui/ConfirmModal";
interface Props {
  novelId: number;
  title: string;
  prevId: number;
  prevFree: boolean;
  prevRead: boolean;
  nextId: number;
  nextFree: boolean;
  nextRead: boolean;
}

export default function ViewerBottom({
  novelId,
  title,
  prevId,
  prevFree,
  prevRead,
  nextId,
  nextFree,
  nextRead,
}: Props) {

  const [shouldRefetchTotalRating, setShouldRefetchTotalRating] =
    useRecoilState(shouldRefetchTotalRatingState);
  const router = useRouter();
  const [activeIcon, setActiveIcon] = useState<
    "menu" | "reviewRating" | "comment" | "beforenovel" | "nextnovel" | null
  >(null);
  const [cookies] = useCookies(["uuid"]);
  const episodeId = router.query.episodeId;
  const isLoggedIn = !!cookies.uuid;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [situation, setSituation] = useState<"결제" | "부족">("부족");
  const [color, setColor] = useState<string>("");
  const [epiId, setEpiId] = useState<number>(0);
  const handleIconClick = (title: any) => {
    //평점 아이콘 클릭 시 로그인 페이지로 이동
    if (title === "reviewRating" && !isLoggedIn) {
      sessionStorage.setItem("link", router.asPath);
      router.push("/login");
    }
    // 전 에피소드가 무료이면
    if (title === "beforenovel" && prevFree) {
      setActiveIcon(null);
      router.push(`/viewer/${prevId}`);
    }
    // 다음 에피소드가 무료이면
    if (title === "nextnovel" && nextFree) {
      router.push(`/viewer/${nextId}`);
    }
    // 전 , 후 에피소드를 눌렸을때 로그인이 안되어있고 유료면 로그인 시키기 // 다시와서 유저가 구매하기
    if (
      (title === "beforenovel" && !isLoggedIn && !prevFree) ||
      (title === "nextnovel" && !isLoggedIn && !nextFree)
    ) {
      router.push("/login");
    }
    //로그인 되어있고 구매했으면 읽기(전 에피소드)
    if (title === "beforenovel" && isLoggedIn && prevRead) {
      router.push(`/viewer/${prevId}`);
    }
    //로그인 되어있고 구매했으면 읽기(다음 화 에피소드)
    if (title === "nextnovel" && isLoggedIn && nextRead) {
      router.push(`/viewer/${nextId}`);
    }
    // 로그인 되어있고 구매안했는데 유료일때 구매하기로 가기(전 에피소드)
    if (title === "beforenovel" && isLoggedIn && !prevFree) {
      const userPoint = Number(sessionStorage.getItem("point"));
      if (userPoint < 100) {
        setColor("green");
        setSituation("부족");
        setIsModalOpen(!isModalOpen);
      }
      //포인트 보유
      else {
        setColor("purple");
        setSituation("결제");
        setIsModalOpen(!isModalOpen);
      }
    }
    // 로그인 되어있고 구매안했는데 유료일때 구매하기로 가기(다음화 에피소드)
    if (title === "nextnovel" && isLoggedIn && !nextFree) {
      const userPoint = Number(sessionStorage.getItem("point"));
      if (userPoint < 100) {
        setColor("green");
        setSituation("부족");
        setIsModalOpen(!isModalOpen);
      }
      //포인트 보유
      else {
        setColor("purple");
        setSituation("결제");
        setIsModalOpen(!isModalOpen);
      }
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
  }, [setShouldRefetchTotalRating, refetch, shouldRefetchTotalRating]);

  return (
    <>

      {isModalOpen ? (
        <ConfirmModal
          color={color}
          epiId={epiId}
          situation={situation}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <div className={style.container}>
          <ReadingProgressGraph />
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
                  <div className={style.starRatingNumber}>
                    {totalStarRating}
                  </div>
                )}
              </div>
            ))}
          </div>
          {activeIcon === "reviewRating" ||
            (activeIcon === "comment" && (
              <SlideComponent
                activeIcon={activeIcon}
                onClose={closeSlide}
                novelId={novelId}
                title={title}
              />
            ))}
        </div>
      )}
    </>
  );
}
