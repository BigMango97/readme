import React, { useEffect, useState } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  scheduleListType,
  scheduleTableType,
  scheduleType,
} from "@/types/admin/scheduleType";
import axios from "axios";
import Config from "@/configs/config.export";
import ScheduleModal from "@/components/ui/admin/ScheduleModal";

export default function ScheduleTable() {
  const baseUrl = Config().baseUrl;
  const [scheduleData, setScheduleData] = useState<scheduleListType>();
  const [editId, setEditId] = useState(0);
  useEffect(() => {
    axios.get(`${baseUrl}/sections-service/v1/admin/schedules`).then((res) => {
      console.log(res.data.data);
      setScheduleData({
        scheduleList: res.data.data,
      });
    });
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showEditModal = (id: number) => {
    setEditId(id);
    setIsModalOpen(!isModalOpen);
  };
  const deleteHandle = (id: number) => {
    axios
      .delete(`${baseUrl}/sections-service/v1/admin/schedules/${id}`)
      .then((res) => {
        console.log(res);
      });
  };

  const columns: ColumnsType<scheduleType> = [
    {
      dataIndex: "번호",
      title: "번호",
      sorter: (a, b) => a.id - b.id,
      width: "5%",
      render: (_, { id }) => <>{id}</>,
    },
    {
      dataIndex: "스케줄명",
      title: "스케줄명",
      width: "20%",
      render: (_, { name }) => <>{name}</>,
    },
    {
      dataIndex: "이벤트기간",
      title: "이벤트기간",
      width: "20%",
      render: (_, { startDate, endDate }) => <>{`${startDate} ~ ${endDate}`}</>,
    },
    {
      dataIndex: "수정",
      title: "수정",
      width: "5%",
      render: (_, { id }) => <EditOutlined onClick={() => showEditModal(id)} />,
    },
    {
      dataIndex: "삭제",
      title: "삭제",
      width: "5%",
      render: (_, { id }) => (
        <DeleteOutlined onClick={() => deleteHandle(id)} />
      ),
    },
  ];

  const onChange: TableProps<scheduleType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const dataSource: scheduleTableType[] = [];
  scheduleData?.scheduleList.map((item) => {
    dataSource.push({
      key: item.id,
      id: item.id,
      name: item.name,
      startDate: item.startDate,
      endDate: item.endDate,
    });
  });
  return (
    <>
      <ScheduleModal
        id={editId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        style={{ fontSize: "1rem" }}
      />
    </>
  );
}
