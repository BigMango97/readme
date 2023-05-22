import React from "react";
import { Select } from "antd";
import { novelInputType } from "@/types/admin/novelType";

export default function NovelSelect(props: {
  type: string;
  inputData: novelInputType;
  setInputData: React.Dispatch<React.SetStateAction<novelInputType>>;
}) {
  const changeSelectHandle = (select: string) => {
    if (props.type === "grade") {
      const selectNum = Number(select);
      props.setInputData({
        ...props.inputData,
        [props.type]: selectNum,
      });
    } else {
      props.setInputData({
        ...props.inputData,
        [props.type]: select,
      });
    }
  };

  const gradeOption = [
    { value: "0", label: "전체연령가" },
    { value: "12", label: "12세" },
    { value: "15", label: "15세" },
    { value: "19", label: "19세" },
  ];
  const genreOption = [
    { value: "판타지", label: "판타지" },
    { value: "현판", label: "현판" },
    { value: "로맨스", label: "로맨스" },
    { value: "로판", label: "로판" },
    { value: "무협", label: "무협" },
    { value: "드라마", label: "드라마" },
  ];
  const serialStatusOption = [
    { value: "연재중", label: "연재중" },
    { value: "휴재", label: "휴재" },
    { value: "완결", label: "완결" },
  ];

  let option, val;
  if (props.type === "grade") {
    option = gradeOption;
    if (props.inputData.grade === 0) {
      val = "전체연령가";
    } else if (props.inputData.grade === 12) {
      val = "12세";
    } else if (props.inputData.grade === 15) {
      val = "15세";
    } else if (props.inputData.grade === 19) {
      val = "19세";
    } else if (props.inputData.grade === -1) {
      val = "";
    }
  } else if (props.type === "genre") {
    option = genreOption;
    val = props.inputData.genre;
  } else if (props.type === "serializationStatus") {
    option = serialStatusOption;
    val = props.inputData.serializationStatus;
  }

  return (
    <>
      <Select onChange={changeSelectHandle} options={option} value={val} />
    </>
  );
}
