import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import AdminButton from "./AdminButton";
import { DatePicker, Input, Modal, Space } from "antd";
import ScheduleTable from "./ScheduleTable";

export default function ScheduleList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { RangePicker } = DatePicker;

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

      <Modal
        title="스케줄 등록"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ margin: "30px 0px" }}>
          <div style={{ display: "flex", margin: "20px 0px" }}>
            <div style={{ width: "120px" }}>스케줄</div>
            <Input placeholder="Basic usage" />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "20%" }}>이벤트기간</div>
            <Space direction="vertical" size={12}>
              <RangePicker />
            </Space>
          </div>
        </div>
      </Modal>

      <ScheduleTable />
    </>
  );
}
