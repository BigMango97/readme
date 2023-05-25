import { Modal, Select, Space } from "antd";
import axios from "@/configs/axiosConfig";
import React, { useEffect, useState } from "react";
import { scheduleListType } from "@/types/admin/scheduleType";
import dayjs from "dayjs";
import { novelListType } from "@/types/admin/novelType";

export default function CardModal(props: {
  id: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [scheduleList, setScheduleList] = useState<scheduleListType>();
  const [novelList, setNovelList] = useState<novelListType>();

  const [scheduleId, setScheduleId] = useState<number>();
  const [novelIds, setNovelIds] = useState<number[]>();
  const handleOk = () => {
    novelIds?.map((novelId) => {
      axios
        .patch(`/sections-service/v1/admin/cards/novels/${novelId}`, {
          scheduleId: scheduleId,
        })
        .then((res) => {
          console.log(res);
        });
    });

    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  const selectScheduleHandle = (selectValue: string) => {
    setScheduleId(Number(selectValue));
  };
  const selectNovelHandle = (selectValues: string[]) => {
    const values = selectValues.map((item) => {
      return Number(item);
    });
    setNovelIds(values);
  };
  useEffect(() => {
    axios.get(`/novels-service/v1/admin/novels`).then((res) => {
      setNovelList({ novelList: res.data.data.contents });
    });
    axios.get(`/sections-service/v1/admin/schedules`).then((res) => {
      setScheduleList({ scheduleList: res.data.data });
    });
  }, []);
  let title = "카드 등록";

  interface optionType {
    value: string;
    label: string;
  }
  const novelOption: optionType[] = [];
  novelList?.novelList.map((item) => {
    novelOption.push({ value: item.id.toString(), label: item.title });
  });

  const scheduleOption: optionType[] = [];
  scheduleList?.scheduleList.map((item) => {
    scheduleOption.push({ value: item.id.toString(), label: item.name });
  });
  return (
    <Modal
      title={title}
      open={props.isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div style={{ margin: "30px 0px" }}>
        <div style={{ display: "flex", margin: "20px 0px" }}>
          <div style={{ width: "80px" }}>스케줄</div>
          <Space wrap>
            <Select
              defaultValue=""
              style={{ width: "280px" }}
              onChange={selectScheduleHandle}
              options={scheduleOption}
            />
          </Space>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100px" }}>소설</div>
          <Select
            mode="multiple"
            placeholder="Inserted are removed"
            //value={selectedItems}
            onChange={selectNovelHandle}
            style={{ width: "100%" }}
            options={novelOption}
          />
        </div>
      </div>
    </Modal>
  );
}
