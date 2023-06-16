import React from "react";
import { Input } from "antd";
import { episodeInputType } from "@/types/admin/episodeType";

export default function EpisodeInput(props: {
  type: string;
  inputData: episodeInputType;
  setInputData: React.Dispatch<React.SetStateAction<episodeInputType>>;
}) {
  const changeInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.setInputData({
      ...props.inputData,
      [props.type]: e.target.value,
    });
  };
  let value;
  if (props.type === "title") {
    value = props.inputData.title;
  }

  return (
    <>
      <Input value={value} onChange={changeInputHandle} maxLength={30} />
    </>
  );
}
