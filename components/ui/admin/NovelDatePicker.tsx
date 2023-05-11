import React from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { inputNovelType } from "@/types/admin/novelType";

export default function NovelDatePicker(props: {
  inputData: inputNovelType;
  setInputData: React.Dispatch<React.SetStateAction<inputNovelType>>;
}) {
  const changeDateHandle: DatePickerProps["onChange"] = (date, dateString) => {
    console.log("dateString = ", date);
    if (date !== null) {
      let date1 = date?.format("YYYY-MM-DDTHH:mm:ss.ms");
      let date2 = new Date(date1);
      // console.log(date2);

      let date3 = date.toISOString();
      //let date4 = Date.parse(date3);

      //console.log("dddddddd", date4);

      props.setInputData({
        ...props.inputData,
        startDate: date2,
      });
    }

    // let year = date1?.year;
    // let month = date1?.month;
    // let day = date?.day;
    // let hour = date?.hour;
    // let min = date?.minute;
    // let sec = date?.second;
    // let ms = date?.millisecond;

    // props.setDatePicker(dateString);
  };
  return (
    <>
      <DatePicker onChange={changeDateHandle} />
    </>
  );
}
