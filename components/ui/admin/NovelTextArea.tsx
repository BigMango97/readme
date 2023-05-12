import React from "react";
import { Input } from "antd";
import { inputNovelType } from "@/types/admin/novelType";

const { TextArea } = Input;

export default function NovelTextArea(props: {
  rows: number;
  inputData: inputNovelType;
  setInputData: React.Dispatch<React.SetStateAction<inputNovelType>>;
}) {
  const changeInputHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    //props.setInput(e.target.value);
    props.setInputData({
      ...props.inputData,
      description: e.target.value,
    });
  };
  return (
    <>
      <TextArea
        rows={props.rows}
        onChange={changeInputHandle}
        value={props.inputData.description}
      />
    </>
  );
}
