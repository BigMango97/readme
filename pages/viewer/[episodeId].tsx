import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import style from "@/components/pages/noveldetail/ViewerPage.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import Comments from "@/components/pages/viewer/Comments";
import { useRouter } from "next/router";
import Config from "@/configs/config.export";
import { viewerData } from "@/types/model/mainDataType";

export default function ViewerPage() {
  const router = useRouter();
  const baseUrl = Config().baseUrl;
  const episodeid = router.asPath.split("/")[2];
  const [viewerData, setViewerData] = useState<viewerData>();
  const [draggedParagraphIndex, setDraggedParagraphIndex] = useState(-1); // 드래그된 p 태그의 인덱스
  const [selectedEmoji, setSelectedEmoji] = useState<string[]>([]); // 선택된 이모지 상태 변수
  const [showEmojiPanel, setShowEmojiPanel] = useState<boolean[]>([]); // 이모지 패널 표시 상태 변수

  useEffect(() => {
    axios
      .get(`${baseUrl}/novels-service/v1/episodes/${episodeid}`)
      .then((res) => {
        setViewerData(res.data.data);
      });
  }, [baseUrl, episodeid]);

  const handleDragStart = (
    event: React.MouseEvent<HTMLParagraphElement>,
    index: number
  ) => {
    event.preventDefault();
    setDraggedParagraphIndex(index);
    setShowEmojiPanel((prevPanels) => {
      const updatedPanels = [...prevPanels];
      updatedPanels[index] = true;
      return updatedPanels;
    });
  };

  const handleEmojiSelect = (emoji: string) => {
    if (draggedParagraphIndex !== -1) {
      setSelectedEmoji((prevEmojis) => {
        const updatedEmojis = [...prevEmojis];
        updatedEmojis[draggedParagraphIndex] = emoji;
        return updatedEmojis;
      });
    }
    setShowEmojiPanel((prevPanels) => {
      const updatedPanels = [...prevPanels];
      updatedPanels[draggedParagraphIndex] = false;
      return updatedPanels;
    });
  };

  const renderContent = () => {
    const paragraphs = viewerData?.content.split("</p>");

    return paragraphs?.map((paragraph, index) => {
      const text = paragraph.replace("<p>", "");
      return (
        <p key={index} onMouseDown={(event) => handleDragStart(event, index)}>
          {text}
          {selectedEmoji[index] && <span>{selectedEmoji[index]}</span>}
          {draggedParagraphIndex === index && (
            <>
              {showEmojiPanel[index] && (
                <div className={style.emojiPanel}>
                  <button onClick={() => handleEmojiSelect("😊")}>😊</button>
                  <button onClick={() => handleEmojiSelect("🎉")}>🎉</button>
                  <button onClick={() => handleEmojiSelect("❤️")}>❤️</button>
                  <button onClick={() => handleEmojiSelect("😭")}>😭</button>
                  <button onClick={() => handleEmojiSelect("👀")}>👀</button>
                  <button onClick={() => handleEmojiSelect("👍")}>👍</button>
                </div>
              )}
            </>
          )}
        </p>
      );
    });
  };

  useEffect(() => {
    const initialEmojiState = new Array(renderContent()?.length).fill("");
    console.log("initialEmojiStateinitialEmojiStateinitialEmojiState",initialEmojiState)
    setSelectedEmoji(initialEmojiState);

    const initialPanelState = new Array(renderContent()?.length).fill(false);
    console.log("initialPanelStateinitialPanelStateinitialPanelStateinitialPanelState",initialPanelState)
    setShowEmojiPanel(initialPanelState);
  }, [viewerData]);
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
          <div className={style.viewerContainer}></div>{renderContent()}
         <Comments/>
        </div>
      )}
    </>
  );
}
