import React from "react";
export default function LineSeparator(props: {
  backgroundcolor: string;
  width: string;
  height: string;
  margin: string;
}) {
  return (
    <div
      style={{
        backgroundColor: props.backgroundcolor,
        width: props.width,
        height: props.height,
        margin: props.margin,
      }}
    ></div>
  );
}
