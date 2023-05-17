import React, { useEffect, useState } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { scheduleListType, scheduleType } from "@/types/admin/scheduleType";
import axios from "axios";
import Config from "@/configs/config.export";

export default function ScheduleTable() {
  const baseUrl = Config().baseUrl;
  const [scheduleData, setScheduleData] = useState<scheduleListType>();
  useEffect(() => {
    axios.get(`${baseUrl}/sections-service/v1/admin/schedules`).then((res) => {
      console.log(res.data.data);
      setScheduleData({
        scheduleList: res.data.data,
      });
    });
  }, []);
  const moveEditForm = (id: number) => {};
  const deleteHandle = (id: number) => {};

  const columns: ColumnsType<scheduleType> = [
    {
      key: "번호",
      dataIndex: "번호",
      title: "번호",
      sorter: (a, b) => a.id - b.id,
      width: "5%",
      render: (_, { id }) => <>{id}</>,
    },
    {
      key: "스케줄명",
      dataIndex: "스케줄명",
      title: "스케줄명",
      width: "20%",
      render: (_, { name }) => <>{name}</>,
    },
    {
      key: "이벤트기간",
      dataIndex: "이벤트기간",
      title: "이벤트기간",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
        },
        {
          text: "Category 2",
          value: "Category 2",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      // onFilter: (value: string | number | boolean, record) =>
      //   record.startDate.date,
      width: "20%",
      render: (_, { startDate, endDate }) => <>{`${startDate}~${endDate}`}</>,
    },
    {
      key: "수정",
      dataIndex: "수정",
      title: "수정",
      width: "5%",
      render: (_, { id }) => <EditOutlined onClick={() => moveEditForm(id)} />,
    },
    {
      key: "삭제",
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

  return (
    <Table
      columns={columns}
      dataSource={scheduleData?.scheduleList}
      onChange={onChange}
      style={{ fontSize: "1rem" }}
    />
  );
}
