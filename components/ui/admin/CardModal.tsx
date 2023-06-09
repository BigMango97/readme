import { Modal, Select, Space } from "antd";
import axios from "@/configs/axiosConfig";
import React, { useEffect, useState } from "react";
import { scheduleListType } from "@/types/admin/scheduleType";
import dayjs from "dayjs";
import { novelIdType, novelListType } from "@/types/admin/novelType";
import { novelOptionType, novelType } from "@/types/admin/cardType";
import { useRouter } from "next/router";

export default function CardModal(props: {
  id: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //모든 스케줄 목록과 소설 목록
  const [scheduleList, setScheduleList] = useState<scheduleListType>();
  const [novelList, setNovelList] = useState<novelListType>();

  const [scheduleId, setScheduleId] = useState<number>(props.id);
  const [novelIds, setNovelIds] = useState<novelIdType[]>([]);
  const [novelIdArray, setNovelIdArray] = useState<string[]>([]);
  const [cardEditData, setCardEditData] = useState<novelType[]>([]);

  //버튼 눌렀을 때
  const handleOk = () => {
    axios
      .put(`/sections-service/v1/admin/schedules/novels/${scheduleId}`, {
        requestNovelIdList: novelIds,
      })
      .then((res) => {
        console.log(res);
      });

    setNovelIds([]);
    setNovelIdArray([]);
    setCardEditData([]);
    setScheduleList({ scheduleList: [] });
    setNovelList({ novelList: [] });
    props.setIsModalOpen(false);
  };

  //취소 버튼
  const handleCancel = () => {
    setNovelIds([]);
    setNovelIdArray([]);
    setCardEditData([]);
    setScheduleList({ scheduleList: [] });
    setNovelList({ novelList: [] });
    props.setIsModalOpen(false);
  };

  //스케줄 선택
  const selectScheduleHandle = (selectValue: string) => {
    setScheduleId(Number(selectValue));
  };

  //소설 선택
  const selectNovelHandle = (selectValues: string[]) => {
    console.log("selectValues", selectValues);
    selectValues.map((item) => {
      setNovelIds([...novelIds, { novelId: Number(item) }]);
    });

    setNovelIdArray(selectValues);
  };

  const novelOption: optionType[] = [];
  const scheduleOption: optionType[] = [];

  useEffect(() => {
    axios.get(`/novels-service/v1/admin/novels`).then((res) => {
      setNovelList({ novelList: res.data.data.contents });
    });
    axios.get(`/sections-service/v1/admin/schedules`).then((res) => {
      setScheduleList({ scheduleList: res.data.data });
    });
    //수정 시
    if (props.id !== 0) {
      axios
        .get(`/sections-service/v1/admin/schedules/novels/${props.id}`)
        .then((res) => {
          setCardEditData(res.data.data.novelCardsBySchedules);
        });
    }
    setScheduleId(props.id);
  }, [props.isModalOpen, props.id]);

  useEffect(() => {
    cardEditData.map((item) => {
      setNovelIds([...novelIds, { novelId: Number(item.novelId) }]);
    });
    const novelEditIds = cardEditData.map((item) => item.novelId.toString());
    setNovelIdArray(novelEditIds);
  }, [cardEditData]);

  interface optionType {
    value: string;
    label: string;
  }
  novelList?.novelList.map((item) => {
    novelOption.push({ value: item.id.toString(), label: item.title });
  });

  scheduleList?.scheduleList.map((item) => {
    scheduleOption.push({ value: item.id.toString(), label: item.name });
  });

  return (
    <Modal
      title={props.id === 0 ? "카드등록" : "카드수정"}
      open={props.isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div style={{ margin: "30px 0px" }}>
        <div style={{ display: "flex", margin: "20px 0px" }}>
          <div style={{ width: "80px" }}>스케줄</div>
          <Space wrap>
            {props.id === 0 ? (
              <Select
                style={{ width: "280px" }}
                onChange={selectScheduleHandle}
                options={scheduleOption}
                disabled={props.id === 0 ? false : true}
              />
            ) : (
              <Select
                value={`${props.id}`}
                style={{ width: "280px" }}
                onChange={selectScheduleHandle}
                options={scheduleOption}
                disabled={props.id === 0 ? false : true}
              />
            )}
          </Space>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100px" }}>소설</div>
          <Select
            mode="multiple"
            onChange={selectNovelHandle}
            style={{ width: "100%" }}
            options={novelOption}
            value={novelIdArray}
          />
        </div>
      </div>
    </Modal>
  );
}
