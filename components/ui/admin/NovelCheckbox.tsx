import React from "react";
import { Checkbox } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { inputNovelType } from "@/types/admin/novelType";

export default function NovelCheckbox(props: {
  inputData: inputNovelType;
  setInputData: React.Dispatch<React.SetStateAction<inputNovelType>>;
}) {
  const options = [
    // { value: "월", label: "월" },
    // { value: "화", label: "화" },
    // { value: "수", label: "수" },
    // { value: "목", label: "목" },
    // { value: "금", label: "금" },
    // { value: "토", label: "토" },
    // { value: "일", label: "일" },
    { label: "월", value: 1 },
    { label: "화", value: 2 },
    { label: "수", value: 3 },
    { label: "목", value: 4 },
    { label: "금", value: 5 },
    { label: "토", value: 6 },
    { label: "일", value: 7 },
  ];
  const changeCheckHandle = (checkedValues: number[]) => {
    console.log("checked = ", checkedValues);
    const days: string[] = [];
    checkedValues.map((item) => {
      let strDay: string = "";
      switch (item) {
        case 1:
          strDay = "월";
          break;
        case 2:
          strDay = "화";
          break;
        case 3:
          strDay = "수";
          break;
        case 4:
          strDay = "목";
          break;
        case 5:
          strDay = "금";
          break;
        case 6:
          strDay = "토";
          break;
        case 7:
          strDay = "일";
          break;
      }
      days.push(strDay);
    });
    //props.setCheck(checkedValues);
    props.setInputData({
      ...props.inputData,
      serializationDay: days,
    });
  };
  return (
    <>
      <Checkbox.Group options={options} onChange={changeCheckHandle} />
    </>
  );
}
