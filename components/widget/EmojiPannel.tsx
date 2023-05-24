import React, { useEffect, useState } from "react";
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
  console.log("position", position);

  useEffect(() => {
    const handleMove = (event: MouseEvent | TouchEvent) => {
      setPosition((prevPosition) => {
        if (event instanceof MouseEvent) {
          return { x: event.pageX, y: event.pageY - window.scrollY };
        } else {
          return {
            x: event.touches[0].pageX,
            y: event.touches[0].pageY - window.scrollY,
          };
        }
      });
    };
  
    window.addEventListener("mousemove", handleMove as any);
    window.addEventListener("touchmove", handleMove as any);
  
    return () => {
      window.removeEventListener("mousemove", handleMove as any);
      window.removeEventListener("touchmove", handleMove as any);
    };
  }, []);

  const [isPanelVisible, setIsPanelVisible] = useState(true);

  const handleScroll = () => {
    window.removeEventListener("scroll", handleScroll);
  };

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      setPosition({ x: event.touches[0].pageX, y: event.touches[0].pageY - window.scrollY });
    };
    window.addEventListener("touchmove", handleTouchMove);

    const handleRender = () => {
      const emojiWrapElement = document.getElementById("emojiWrap");
      if (emojiWrapElement) {
        emojiWrapElement.style.left = `${position.x}px`;
        emojiWrapElement.style.top = `${position.y}px`;
      }
    };
    handleRender();

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [position]);

  return (
    <div
      id="emojiWrap"
      className={`${style.emojiWrap} ${
        isPanelVisible ? style.visible : style.hidden
      }`}
      style={{ position: "absolute" }}
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