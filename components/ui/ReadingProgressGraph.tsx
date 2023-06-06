import React from "react";
import { useRecoilValue } from "recoil";
import { scrollPercentState } from "@/state/scrollPercentState";
import style from "@/components/ui/ReadingProgressGraph.module.css";
export default function ReadingProgressGraph() {
  const scrollPercent = useRecoilValue(scrollPercentState);

  return (
    <div
      className={style.container}
      style={{
        width: `${scrollPercent}%`,
      }}
    />
  );
}
