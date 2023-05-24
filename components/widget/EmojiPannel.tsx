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
}

export default function EmojiPannel(props: EmojiPannelProps) {
  const { xNumber, yNumber, emojiHandler } = props;
  const data: Emoji[] = [
    { id: 1, emoji: "😀" },
    { id: 2, emoji: "🤣" },
    { id: 3, emoji: "😨" },
  ];

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: xNumber,
    y: yNumber,
  });
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: TouchEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("touchmove", handleMove as any);

    return () => {
      window.removeEventListener("touchmove", handleMove as any);
    };
  }, []);

  useEffect(() => {
    const handleRender = () => {
      if (panelRef.current) {
        const rect = panelRef.current.getBoundingClientRect();
        const offsetX = rect.width / 2;
        const offsetY = rect.height / 2;
        setPosition((prevPosition) => ({
          x: prevPosition.x - offsetX,
          y: prevPosition.y - offsetY,
        }));
      }
    };
    handleRender();
  }, []);

  useEffect(() => {
    setIsPanelVisible(true);
    const timer = setTimeout(() => {
      setIsPanelVisible(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      id="emojiWrap"
      className={`${style.emojiWrap} ${
        isPanelVisible ? style.visible : style.hidden
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
          onClick={() => emojiHandler(item.id)}
          onTouchStart={() => emojiHandler(item.id)}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
