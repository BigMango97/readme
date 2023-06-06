import React, { useEffect, useState } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  scheduleListType,
  scheduleTableType,
  scheduleType,
} from "@/types/admin/scheduleType";

import ScheduleModal from "@/components/ui/admin/ScheduleModal";
import dayjs from "dayjs";
import axios from "@/configs/axiosConfig";

export default function ScheduleTable(props: {
  scheduleData: scheduleListType;
  setScheduleData: React.Dispatch<React.SetStateAction<scheduleListType>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const showEditModal = (id: number) => {
    props.setModalId(id);
    props.setIsModalOpen(true);
  };
  //스케줄 삭제
  const deleteHandle = async (id: number) => {
    const res = await axios.delete(
      `/sections-service/v1/admin/schedules/${id}`
    );
    axios.get(`/sections-service/v1/admin/schedules`).then((res) => {
      console.log(res.data.data);
      props.setScheduleData({
        scheduleList: res.data.data,
      });
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
  props.scheduleData.scheduleList.map((item) => {
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
      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        style={{ fontSize: "1rem" }}
      />
    </>
  );
}
