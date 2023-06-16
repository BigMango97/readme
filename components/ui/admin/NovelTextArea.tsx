import React from "react";
import { Input } from "antd";
import { novelInputType } from "@/types/admin/novelType";

const { TextArea } = Input;

export default function NovelTextArea(props: {
  rows: number;
  inputData: novelInputType;
  setInputData: React.Dispatch<React.SetStateAction<novelInputType>>;
}) {
  const changeInputHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
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
