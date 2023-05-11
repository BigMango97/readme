import React from "react";
import { Select } from "antd";
import { inputNovelType } from "@/types/admin/novelType";

export default function NovelSelect(props: {
  type: string;
  inputData: inputNovelType;
  setInputData: React.Dispatch<React.SetStateAction<inputNovelType>>;
}) {
  const changeSelectHandle = (value: string | number) => {
    props.setInputData({
      ...props.inputData,
      [props.type]: value,
    });
  };

  const gradeOption = [
    { value: 0, label: "전체연령가" },
    { value: 12, label: "12세" },
    { value: 15, label: "15세" },
    { value: 19, label: "19세" },
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

  let option;

  if (props.type === "genre") {
    option = genreOption;
  } else if (props.type === "serializationStatus") {
    option = serialStatusOption;
  }

  return (
    <>
      {props.type === "grade" ? (
        <Select onChange={changeSelectHandle} options={gradeOption} />
      ) : (
        <Select onChange={changeSelectHandle} options={option} />
      )}
    </>
  );
}
