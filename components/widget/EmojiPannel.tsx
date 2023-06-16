import React, { useEffect, useState, useRef } from "react";
import style from "./EmojiPannel.module.css";

interface Emoji {
  id: number;
  emoji: string;
}

interface EmojiPannelProps {
  xNumber: number;
  yNumber: number;
  emojiHandler: (id: number) => void;
  isEmojiPanelVisible: boolean;
  onHidePanel: () => void;
}

export default function EmojiPannel(props: EmojiPannelProps) {
  const { xNumber, yNumber, emojiHandler, isEmojiPanelVisible, onHidePanel } =
    props;
  const data: Emoji[] = [
    { id: 1, emoji: "😀" },
    { id: 2, emoji: "🤣" },
    { id: 3, emoji: "😨" },
  ];

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: xNumber,
    y: yNumber,
  });
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleRender = () => {
      if (panelRef.current) {
        const rect = panelRef.current.getBoundingClientRect();
        const offsetX = rect.width / 2;
        const offsetY = rect.height / 2;

        let right = props.xNumber - offsetX;
        let top = props.yNumber - offsetY;

        right += 50;
        top -= 30;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        if (right + rect.width > windowWidth) {
          right = windowWidth - rect.width;
        }
        if (top + rect.height > windowHeight) {
          top = windowHeight - rect.height;
        }
        if (right < 0) {
          right = 0;
        }
        if (top < 0) {
          top = 0;
        }

        setPosition({ x: right, y: top });
      }
    };
    handleRender();
  }, [props.xNumber, props.yNumber]);

  const handleClick = (id: number) => {
    emojiHandler(id);
    onHidePanel();
  };

  return (
    <div
      ref={panelRef}
      id="emojiWrap"
      className={`${style.emojiWrap} ${
        isEmojiPanelVisible ? style.visible : style.hidden
      }`}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {data.map((item) => (
        <div
          key={item.id}
          className={style.emoji}
          onClick={() => handleClick(item.id)}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
