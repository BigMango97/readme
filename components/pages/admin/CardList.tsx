import React, { useState } from "react";
import CardTable from "./CardTable";
import AdminButton from "./AdminButton";
import { Modal, Select, Space } from "antd";

export default function CardList() {
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
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          margin: "1rem",
        }}
      >
        <AdminButton title={"카드등록"} onClick={showModal} />
      </div>
      <Modal
        title="Card등록"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ margin: "30px 0px" }}>
          <div style={{ display: "flex", margin: "20px 0px" }}>
            <div style={{ width: "80px" }}>스케줄</div>
            <Space wrap>
              <Select
                defaultValue="lucy"
                style={{ width: "120px" }}
                onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  {
                    value: "disabled",
                    label: "Disabled",
                    disabled: true,
                  },
                ]}
              />
            </Space>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "100px" }}>소설</div>
            <Select
              mode="multiple"
              placeholder="Inserted are removed"
              value={selectedItems}
              onChange={setSelectedItems}
              style={{ width: "100%" }}
              options={filteredOptions.map((item) => ({
                value: item,
                label: item,
              }))}
            />
          </div>
        </div>
      </Modal>
      <CardTable />
    </>
  );
}
