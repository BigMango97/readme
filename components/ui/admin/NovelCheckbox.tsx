import React from "react";
import { Checkbox } from "antd";
import { novelInputType } from "@/types/admin/novelType";
import { CheckboxValueType } from "antd/es/checkbox/Group";

export default function NovelCheckbox(props: {
  inputData: novelInputType;
  setInputData: React.Dispatch<React.SetStateAction<novelInputType>>;
}) {
  const options = [
    { label: "월", value: 1 },
    { label: "화", value: 2 },
    { label: "수", value: 3 },
    { label: "목", value: 4 },
    { label: "금", value: 5 },
    { label: "토", value: 6 },
    { label: "일", value: 7 },
  ];
  const changeCheckHandle = (checkedValues: CheckboxValueType[]) => {
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
    props.setInputData({
      ...props.inputData,
      serializationDay: days,
    });
  };
  const numDays: number[] = [];
  props.inputData.serializationDay;
  props.inputData.serializationDay.map((item) => {
    let numDay: number = 0;
    switch (item) {
      case "월":
        numDay = 1;
        break;
      case "화":
        numDay = 2;
        break;
      case "수":
        numDay = 3;
        break;
      case "목":
        numDay = 4;
        break;
      case "금":
        numDay = 5;
        break;
      case "토":
        numDay = 6;
        break;
      case "일":
        numDay = 7;
        break;
    }
    numDays.push(numDay);
  });

  return (
    <>
      <Checkbox.Group
        options={options}
        onChange={changeCheckHandle}
        value={numDays}
      />
    </>
  );
}
