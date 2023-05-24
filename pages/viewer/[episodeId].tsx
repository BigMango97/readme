import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import style from "@/components/pages/noveldetail/ViewerPage.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import Comments from "@/components/pages/viewer/Comments";
import { useRouter } from "next/router";
import Config from "@/configs/config.export";
import { viewerData } from "@/types/model/mainDataType";
import NovelViewer from "@/components/pages/viewer/NovelViewer";

export default function ViewerPage() {
  const router = useRouter();

  const episodeid = router.asPath.split("/")[2];
  const baseUrl = Config().baseUrl;
  const [viewerData, setViewerData] = useState<viewerData>();

  useEffect(() => {
    axios
      .get(`${baseUrl}/novels-service/v1/episodes/${episodeid}`)
      .then((res) => {
        setViewerData(res.data.data);
      });
  }, [baseUrl, episodeid]);

  return (
    <>
      {viewerData && (
        <div className={style.container}>
          <div className={style.topContainer}>
            <div className={style.titleContainer}>
              <div className={style.homeImg}>
                <Image
                  src={"/assets/images/icons/home_black.svg"}
                  alt={"이미지"}
                  width={25}
                  height={25}
                />
              </div>
              <p>{viewerData.title}</p>
              <div className={style.homeImg}>
                <Image
                  src={"/assets/images/icons/my.svg"}
                  alt={"이미지"}
                  width={30}
                  height={30}
                />
              </div>
            </div>
            <LineSeparator colorline="grayline" />
            <div className={style.episodeContainer}>
              <div className={style.leftArrowImg} onClick={() => router.back()}>
                <Image
                  src={"/assets/images/icons/left-chevron.svg"}
                  alt={"이미지"}
                  width={25}
                  height={25}
                />
              </div>
              <div className={style.episodeInfo}>
                <div className={style.episodeTitle}>{viewerData.title}</div>
                <div className={style.episodeDay}>
                  {viewerData.registration}
                </div>
              </div>
            </div>
            <LineSeparator colorline="grayline" />
          </div>
          <NovelViewer viewerData={viewerData.content} />
          <Comments />
        </div>
      )}
    </>
  );
}
