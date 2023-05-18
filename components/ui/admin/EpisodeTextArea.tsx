import React from "react";
import { Input } from "antd";
import { episodeInputType } from "@/types/admin/episodeType";

const { TextArea } = Input;

export default function EpisodeTextArea(props: {
  rows: number;
  inputData: episodeInputType;
  setInputData: React.Dispatch<React.SetStateAction<episodeInputType>>;
}) {
  const changeInputHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    props.setInputData({
      ...props.inputData,
      content: e.target.value,
    });
  };
  return (
    <>
      <TextArea
        rows={props.rows}
        onChange={changeInputHandle}
        value={props.inputData.content}
      />
    </>
  );
}
