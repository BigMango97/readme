import React from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Table } from "antd";

interface DataType {
  번호: number;
  스케줄명: string;
  이벤트기간: string;
}

const columns: ColumnsType<DataType> = [
  {
    key: "번호",
    dataIndex: "번호",
    title: "번호",
    sorter: (a, b) => a.번호 - b.번호,
    width: "5%",
  },
  {
    key: "스케줄명",
    dataIndex: "스케줄명",
    title: "스케줄명",
    width: "20%",
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
    onFilter: (value: string | number | boolean, record) =>
      record.이벤트기간.startsWith(value.toLocaleString()),
    width: "20%",
  },
  {
    key: "수정",
    dataIndex: "수정",
    title: "수정",
    width: "5%",
  },
  {
    key: "삭제",
    dataIndex: "삭제",
    title: "삭제",
    width: "5%",
  },
];

const data: DataType[] = [
  {
    번호: 1,
    스케줄명: "핫신작이다!!!!!!!!!!",
    이벤트기간: "2021-02-01~2024-02-15",
  },
  {
    번호: 2,
    스케줄명: "핫신작이다!!!!!!!!!!",
    이벤트기간: "2021-02-01~2024-02-15",
  },
  {
    번호: 3,
    스케줄명: "핫신작이다!!!!!!!!!!",
    이벤트기간: "2021-02-01~2024-02-15",
  },
  {
    번호: 4,
    스케줄명: "핫신작이다!!!!!!!!!!",
    이벤트기간: "2021-02-01~2024-02-15",
  },
  {
    번호: 5,
    스케줄명: "핫신작이다!!!!!!!!!!",
    이벤트기간: "2021-02-01~2024-02-15",
  },
  {
    번호: 6,
    스케줄명: "핫신작이다!!!!!!!!!!",
    이벤트기간: "2021-02-01~2024-02-15",
  },
  {
    번호: 7,
    스케줄명: "핫신작이다!!!!!!!!!!",
    이벤트기간: "2021-02-01~2024-02-15",
  },
  {
    번호: 8,
    스케줄명: "핫신작이다!!!!!!!!!!",
    이벤트기간: "2021-02-01~2024-02-15",
  },
  {
    번호: 9,
    스케줄명: "핫신작이다!!!!!!!!!!",
    이벤트기간: "2021-02-01~2024-02-15",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const ScheduleTable: React.FC = () => (
  <Table
    columns={columns}
    dataSource={data}
    onChange={onChange}
    style={{ fontSize: "1rem" }}
  />
);

export default ScheduleTable;
