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
    setPosition({ x: xNumber, y: yNumber }); // 이 부분 추가
  }, [xNumber, yNumber]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.pageX, y: event.pageY - window.scrollY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [isPanelVisible, setIsPanelVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.pageX, y: event.pageY - window.scrollY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleRender = () => {
      const emojiWrapElement = document.getElementById("emojiWrap");
      if (emojiWrapElement) {
        emojiWrapElement.style.left = `${position.x}px`;
        emojiWrapElement.style.top = `${position.y}px`;
      }
    };
    handleRender();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
