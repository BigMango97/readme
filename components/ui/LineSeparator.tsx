import React from "react";
import style from "@/components/ui/LineSeparator.module.css";
interface Props {
  colorline: "grayline" | "greenline";
  children?: any;
}
const LineSeparator = ({ colorline, children }: Props) => {
  return (
    <div
      className={colorline === "grayline" ? style.grayline : style.greenline}
    >
      {children}
    </div>
  );
};

export default LineSeparator;
