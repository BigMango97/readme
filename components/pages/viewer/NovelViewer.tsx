import React, { useState, useRef, useEffect } from "react";
import style from "@/components/pages/noveldetail/ViewerPage.module.css";
import EmojiPannel from "@/components/widget/EmojiPannel";

interface NovelViewerProps {
  id: number;
  content: string;
  emojiList?: EmojiList[];
}

interface EmojiList {
  id: number;
  emoji: string;
  count: number;
}

export default function NovelViewer(props: { viewerData: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [textData, setTextData] = useState<NovelViewerProps[]>([]);
  const [xNumber, setXNumber] = useState<number>(0);
  const [yNumber, setYNumber] = useState<number>(0);
  const [targetId, setTargetId] = useState<number>(0);
  const emojiList = [
    { id: 1, emoji: "😀", count: 0 },
    { id: 2, emoji: "🤣", count: 0 },
    { id: 3, emoji: "😨", count: 0 },
  ];
  const [isEmojiPanelVisible, setIsEmojiPanelVisible] = useState(false);
  const longPressTimerRef = useRef<number | null>(null);

  const closeEmojiPanel = () => {
    setIsEmojiPanelVisible(false);
  };

  const targetHandler = (
    id: number,
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    console.log("click", id);
    setTargetId(id);
    setIsEmojiPanelVisible(true);

    if ("touches" in event) {
      setXNumber(event.changedTouches[0].clientX);
      setYNumber(event.changedTouches[0].clientY);
    } else {
      setXNumber(event.clientX);
      setYNumber(event.clientY);
    }
  };

  const emojiHandler = (id: number) => {
    console.log("emoji", id);
    handleAddEmoji(id);
    closeEmojiPanel();
  };

  useEffect(() => {
    const res: NovelViewerProps[] = [];
    props.viewerData?.split("</p>").map((item, index) => {
      const text = item.replace("<p>", "");
      res.push({ id: index, content: text, emojiList: emojiList });
    });
    setTextData(res);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      closeEmojiPanel();
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.addEventListener("touchmove", touchMoveHandler);
    }
    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener("touchmove", touchMoveHandler);
      }
    };
  }, []);

  const touchMoveHandler = (e: TouchEvent | MouseEvent) => {
    if ("touches" in e) {
      // TouchEvent인 경우
      if (e.touches && e.touches.length > 0) {
        setXNumber(e.touches[0].clientX);
        setYNumber(e.touches[0].clientY);
      }
    } else {
      // MouseEvent인 경우
      setXNumber(e.clientX);
      setYNumber(e.clientY);
    }
  };

  const handleAddEmoji = (emojiId: number) => {
    const updatedTextData = textData.map((item) => {
      if (item.id === targetId && item.emojiList) {
        const updatedEmojiList = item.emojiList.map((emoji) => {
          if (emoji.id === emojiId) {
            return {
              ...emoji,
              count: emoji.count + 1,
            };
          } else {
            return emoji;
          }
        });
        return {
          ...item,
          emojiList: updatedEmojiList,
        };
      } else {
        return item;
      }
    });
    setTextData(updatedTextData);
  };

  const handleLongPressStart = (
    id: number,
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    longPressTimerRef.current = window.setTimeout(() => {
      setTargetId(id);
      setIsEmojiPanelVisible(true);

      if ("touches" in event) {
        setXNumber(event.changedTouches[0].clientX);
        setYNumber(event.changedTouches[0].clientY);
      } else {
        setXNumber(event.clientX);
        setYNumber(event.clientY);
      }
    }, 200);
  };

  const handleLongPressEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const onHidePanel = () => {
    setIsEmojiPanelVisible(false);
  };

  return (
    <div ref={targetRef}>
      {isEmojiPanelVisible && (
        <EmojiPannel
          xNumber={xNumber}
          yNumber={yNumber}
          emojiHandler={emojiHandler}
          isEmojiPanelVisible={isEmojiPanelVisible}
          onHidePanel={onHidePanel}
        />
      )}
      <ul className={style.novelViewWrap}>
        {props.viewerData.length > 0 &&
          textData.map((item: NovelViewerProps) => (
            <ListView
              key={item.id}
              data={item}
              targetHandler={targetHandler}
              handleLongPressStart={handleLongPressStart}
              handleLongPressEnd={handleLongPressEnd}
            />
          ))}
      </ul>
    </div>
  );
}

const ListView = (props: {
  data: NovelViewerProps;
  targetHandler: Function;
  handleLongPressStart: Function;
  handleLongPressEnd: Function;
}) => {
  const [isView, setIsView] = useState(false);
  const emojiList = props.data.emojiList || [];

  const handleLongPress = (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    props.handleLongPressStart(props.data.id, event);
  };

  const handleRelease = () => {
    props.handleLongPressEnd();
  };

  const handleAddEmoji = (emojiId: number) => {
    const updatedEmojiList = emojiList.map((emoji) => {
      if (emoji.id === emojiId) {
        return {
          ...emoji,
          count: emoji.count + 1,
        };
      } else {
        return emoji;
      }
    });

    props.targetHandler(props.data.id);
  };

  return (
    <>
      <div
        className={style.emojiContainer}
        onTouchStart={handleLongPress}
        onTouchEnd={handleRelease}
        onMouseDown={handleLongPress}
        onMouseUp={handleRelease}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: props.data.content.replace(/<p>/g, "").replace(/<\/p>/g, ""),
          }}
        />
        {emojiList &&
          emojiList.map(
            (item: EmojiList) =>
              item.count > 0 && (
                <span
                  key={item.id}
                  className={style.emojiItem}
                  onClick={() => handleAddEmoji(item.id)}
                >
                  {item.emoji}
                  {item.count}
                </span>
              )
          )}
      </div>
    </>
  );
};