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

  const handleMove = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (event instanceof MouseEvent) {
      setPosition({ x: event.clientX, y: event.clientY });
    } else {
      setPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMove as any);
    window.addEventListener("touchmove", handleMove as any);

    return () => {
      window.removeEventListener("mousemove", handleMove as any);
      window.removeEventListener("touchmove", handleMove as any);
    };
  }, []);

  const handleClick = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      const offsetX = rect.width / 2;
      const offsetY = rect.height / 2;
      if (event instanceof MouseEvent) {
        setPosition({ x: event.clientX - offsetX, y: event.clientY - offsetY });
      } else {
        setPosition({ x: event.touches[0].clientX - offsetX, y: event.touches[0].clientY - offsetY });
      }
    }
  };

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