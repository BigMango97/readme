import Config from "@/configs/config.export";
import { scheduleListType } from "@/types/admin/scheduleType";
import { DatePicker, DatePickerProps, Input, Modal, Space } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

export default function ScheduleModal(props: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { RangePicker } = DatePicker;
  const baseUrl = Config().baseUrl;

  const handleOk = () => {
    axios.post(`${baseUrl}/sections-service/v1/admin/schedules`, {
      name: inputName,
      startDate: pickStartDate,
      endDate: pickEndDate,
    });
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  const [inputName, setInputName] = useState<string>("");
  const [pickStartDate, setPickStartDate] = useState<Dayjs>();
  const [pickEndDate, setPickEndDate] = useState<Dayjs>();

  const changeInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputName(e.target.value);
  };

  const changeDateHandle = (
    value: RangePickerProps["value"],
    dateString: [string, string]
  ) => {
    if (value !== undefined && value !== null) {
      const start = dayjs(value[0]);
      setPickStartDate(start);
      const end = dayjs(value[1]);
      setPickEndDate(end);
    }
  };

  return (
    <>
      <Modal
        title="스케줄 등록"
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ margin: "30px 0px" }}>
          <div style={{ display: "flex", margin: "20px 0px" }}>
            <div style={{ width: "120px" }}>스케줄</div>
            <Input placeholder="스케줄명" onChange={changeInputHandle} />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "20%" }}>이벤트기간</div>
            <Space direction="vertical" size={12}>
              <RangePicker onChange={changeDateHandle} />
            </Space>
          </div>
        </div>
      </Modal>
    </>
  );
}
