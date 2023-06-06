import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import AdminButton from "./AdminButton";
import { DatePicker, Input, Modal, Space } from "antd";
import ScheduleTable from "./ScheduleTable";
import ScheduleModal from "@/components/ui/admin/ScheduleModal";
import axios from "@/configs/axiosConfig";
import { scheduleListType } from "@/types/admin/scheduleType";

export default function ScheduleManage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState<number>(0);
  const [scheduleData, setScheduleData] = useState<scheduleListType>({
    scheduleList: [],
  });

  useEffect(() => {
    //스케줄 목록
    axios.get(`/sections-service/v1/admin/schedules`).then((res) => {
      console.log(res.data.data);
      setScheduleData({
        scheduleList: res.data.data,
      });
    });
  }, [isModalOpen]);

  const showModal = () => {
    setModalId(0);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          margin: "1rem",
        }}
      >
        <AdminButton title={"스케줄등록"} onClick={showModal} />
      </div>

      <ScheduleModal
        id={modalId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <ScheduleTable
        scheduleData={scheduleData}
        setScheduleData={setScheduleData}
        setIsModalOpen={setIsModalOpen}
        setModalId={setModalId}
      />
    </>
  );
}
