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
import Swal from "sweetalert2";
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
    "reviewRating" | "comment" | "beforenovel" | "nextnovel" | null
  >(null);
  const [slideOpen, setSlideOpen] = useState<boolean>(false);
  const [cookies] = useCookies(["uuid"]);
  const episodeId = router.query.episodeId;
  const isLoggedIn = !!cookies.uuid;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [situation, setSituation] = useState<"결제" | "부족">("부족");
  const [color, setColor] = useState<string>("");
  const [epiId, setEpiId] = useState<number>(0);
  const [userPoint, setUserPoint] = useState<number>(0);
  const getPoint = async () => {
    const pointRes = await axios.get(`/users-service/v1/user/getPoint`);
    setUserPoint(Number(pointRes.data.data.point));
  };
  useEffect(() => {
    getPoint();
  }, [epiId]);

  const handleIconClick = (title: any) => {
    setSlideOpen(true);
    if (title === "reviewRating" && !isLoggedIn) {
      sessionStorage.setItem("link", router.asPath);
      router.push("/login");
    } else if (title === "beforenovel") {
      if (prevId === 0) {
        Swal.fire({
          toast: true,
          position: "bottom",
          icon: "success",
          title: "첫화입니다!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (prevFree) {
        setActiveIcon(null);
        router.push(`/viewer/${prevId}`);
      } else if (isLoggedIn && prevRead) {
        router.push(`/viewer/${prevId}`);
      } else if (isLoggedIn && !prevFree) {
        //const userPoint = Number(sessionStorage.getItem("point"));
        if (userPoint < 100) {
          setColor("green");
          setSituation("부족");
          setIsModalOpen(true);
          setEpiId(prevId);
        } else {
          setColor("purple");
          setSituation("결제");
          setIsModalOpen(true);
          setEpiId(prevId);
        }
      } else {
        router.push("/login");
      }
    } else if (title === "nextnovel") {
      if (nextId === 0) {
        Swal.fire({
          toast: true,
          position: "bottom",
          icon: "success",
          title: "마지막 화입니다!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (nextFree) {
        router.push(`/viewer/${nextId}`);
      } else if (isLoggedIn && nextRead) {
        router.push(`/viewer/${nextId}`);
      } else if (isLoggedIn && !nextFree) {
        if (userPoint < 100) {
          setColor("green");
          setSituation("부족");
          setIsModalOpen(true);
          setEpiId(nextId);
        } else {
          setColor("purple");
          setSituation("결제");
          setIsModalOpen(true);
          setEpiId(nextId);
        }
      } else {
        router.push("/login");
      }
    } else {
      setActiveIcon(title);
    }
  };
  const closeSlide = () => {
    setSlideOpen(false);
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
  const starRatingCheck = rating?.data?.rated;
  useEffect(() => {
    if (shouldRefetchTotalRating) {
      refetch();
      setShouldRefetchTotalRating(false);
    }
  }, [setShouldRefetchTotalRating, refetch, shouldRefetchTotalRating]);

  return (
    <>
      {isModalOpen && (
        <ConfirmModal
          color={color}
          epiId={epiId}
          situation={situation}
          setIsModalOpen={setIsModalOpen}
        />
      )}
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
                src={
                  item.title === "reviewRating" && starRatingCheck===true
                    ? "/assets/images/icons/yellow-star.svg"
                    : item.iconUrl
                }
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
          onClose={closeSlide}
          slideOpen={slideOpen}
          setSlideOpen={setSlideOpen}
          activeIcon={activeIcon}
          novelId={novelId}
          title={title}
        />
      </div>
    </>
  );
}
