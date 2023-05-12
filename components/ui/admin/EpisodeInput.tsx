import React from "react";
import { Input } from "antd";
import { Dispatch, SetStateAction } from "react";
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
  //   if (props.type === "free") {
  //     let free = ""
  //     props.inputData.free === true? free ="무료" : free ="유료"
  //     value = props.inputData.free;
  //   }

  return (
    <>
      <Input value={value} onChange={changeInputHandle} />
    </>
  );
}
