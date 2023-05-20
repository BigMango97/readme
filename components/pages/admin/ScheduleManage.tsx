import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import AdminButton from "./AdminButton";
import { DatePicker, Input, Modal, Space } from "antd";
import ScheduleTable from "./ScheduleTable";
import ScheduleModal from "@/components/ui/admin/ScheduleModal";

export default function ScheduleManage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          margin: "1rem",
        }}
      >
        <AdminButton
          title={"스케줄등록"}
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
      </div>

      <ScheduleModal
        id={0}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <ScheduleTable />
    </>
  );
}
