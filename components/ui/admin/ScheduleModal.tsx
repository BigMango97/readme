import axios from "@/configs/axiosConfig";
import { scheduleType } from "@/types/admin/scheduleType";
import { DatePicker, Input, Modal, Space } from "antd";
import { RangePickerProps } from "antd/es/date-picker";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function ScheduleModal(props: {
  id: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { RangePicker } = DatePicker;

  const [scheduleData, setScheduleData] = useState<scheduleType>({
    id: 0,
    name: "",
    startDate: dayjs(),
    endDate: dayjs(),
  });

  //스케줄 등록 및 수정
  const handleOk = () => {
    //등록
    if (props.id === 0) {
      axios.post(`/sections-service/v1/admin/schedules`, {
        name: scheduleData.name,
        startDate: scheduleData.startDate,
        endDate: scheduleData.endDate,
      });
    }
    //수정
    else {
      const start = dayjs(scheduleData.startDate);
      const end = dayjs(scheduleData.endDate);

      axios.patch(`/sections-service/v1/admin/schedules/${props.id}`, {
        name: scheduleData.name,
        startDate: start,
        endDate: end,
      });
    }
    setScheduleData({ id: 0, name: "", startDate: dayjs(), endDate: dayjs() });
    props.setIsModalOpen(false);
  };
  //취소버튼
  const handleCancel = () => {
    setScheduleData({ id: 0, name: "", startDate: dayjs(), endDate: dayjs() });
    props.setIsModalOpen(false);
  };

  const changeInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setScheduleData({
      ...scheduleData,
      name: e.target.value,
    });
  };
  const changeDateHandle = (value: RangePickerProps["value"]) => {
    if (value !== undefined && value !== null) {
      const start = dayjs(value[0]);
      const end = dayjs(value[1]);
      setScheduleData({
        ...scheduleData,
        startDate: start,
        endDate: end,
      });
    }
  };

  useEffect(() => {
    if (props.id !== 0) {
      axios
        .get(`/sections-service/v1/admin/schedules/${props.id}`)
        .then((res) => {
          setScheduleData({
            id: res.data.data.id,
            name: res.data.data.name,
            startDate: res.data.data.startDate,
            endDate: res.data.data.endDate,
          });
        });
    }
  }, [props.id]);

  return (
    <>
      <Modal
        title={props.id === 0 ? "스케줄등록" : "스케줄수정"}
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ margin: "30px 0px" }}>
          <div style={{ display: "flex", margin: "20px 0px" }}>
            <div style={{ width: "120px" }}>스케줄</div>
            <Input
              placeholder="스케줄명"
              onChange={changeInputHandle}
              value={scheduleData.name}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "20%" }}>이벤트기간</div>
            <Space direction="vertical" size={12}>
              <RangePicker
                onChange={changeDateHandle}
                value={[
                  dayjs(scheduleData.startDate),
                  dayjs(scheduleData.endDate),
                ]}
              />
            </Space>
          </div>
        </div>
      </Modal>
    </>
  );
}
