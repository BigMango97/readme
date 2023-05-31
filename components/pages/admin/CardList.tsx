import React, { useState } from "react";
import CardTable from "./CardTable";
import AdminButton from "./AdminButton";
import { Modal, Select, Space } from "antd";
import CardModal from "@/components/ui/admin/CardModal";

export default function CardList() {
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
          title={"카드등록"}
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
      </div>
      <CardModal
        id={0}
        scheduleName={""}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <CardTable />
    </>
  );
}
