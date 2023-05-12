import React from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { inputNovelType } from "@/types/admin/novelType";
import { episodeInputType } from "@/types/admin/episodeType";

export default function EpisodeDatePicker(props: {
  inputData: episodeInputType;
  setInputData: React.Dispatch<React.SetStateAction<episodeInputType>>;
}) {
  const changeDateHandle: DatePickerProps["onChange"] = (date) => {
    if (date !== null) {
      props.setInputData({
        ...props.inputData,
        createDate: date,
      });
    }
  };
  const strDate = props.inputData.createDate.toString();
  const substringDate = strDate.substring(0, 10);
  return (
    <>
      <DatePicker onChange={changeDateHandle} placeholder={substringDate} />
    </>
  );
}
