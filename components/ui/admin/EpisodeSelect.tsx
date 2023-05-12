import React from "react";
import { Select } from "antd";
import { inputNovelType } from "@/types/admin/novelType";
import { episodeInputType } from "@/types/admin/episodeType";

export default function EpisodeSelect(props: {
  type: string;
  inputData: episodeInputType;
  setInputData: React.Dispatch<React.SetStateAction<episodeInputType>>;
}) {
  const changeSelectHandle = (select: string) => {
    let free = true;
    if (props.type === "free") {
      select === "유료" ? (free = false) : "";
      props.setInputData({
        ...props.inputData,
        [props.type]: free,
      });
    } else {
      props.setInputData({
        ...props.inputData,
        [props.type]: select,
      });
    }
  };

  const stateOption = [
    { value: "삭제", label: "삭제" },
    { value: "판매중", label: "판매중" },
    { value: "임시저장", label: "임시저장" },
  ];
  const freeOption = [
    { value: "무료", label: "무료" },
    { value: "유료", label: "유료" },
  ];

  let option, val;

  if (props.type === "free") {
    option = freeOption;
    props.inputData.free === true ? (val = "무료") : (val = "유료");
  } else if (props.type === "status") {
    option = stateOption;
    val = props.inputData.status;
  }

  return (
    <>
      <Select onChange={changeSelectHandle} options={option} value={val} />
    </>
  );
}
