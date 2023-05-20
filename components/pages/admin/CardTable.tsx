import React from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Space, Table, Tag } from "antd";

interface DataType {
  번호: number;
  썸네일: string;
  작가: string;
  스케줄: string;
}

const columns: ColumnsType<DataType> = [
  {
    //key: "번호",
    dataIndex: "번호",
    title: "번호",
    sorter: (a, b) => a.번호 - b.번호,
    width: "5%",
  },
  {
    //key: "썸네일",
    dataIndex: "썸네일",
    title: "썸네일",
    width: "10%",
  },
  {
    key: "작가",
    dataIndex: "작가",
    title: "작가",
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
      record.작가.startsWith(value.toLocaleString()),
    width: "13%",
  },
  {
    key: "스케줄",
    dataIndex: "스케줄",
    title: "스케줄",
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
      record.스케줄.startsWith(value.toLocaleString()),
    width: "13%",
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

const data: DataType[] = [];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const CardTable: React.FC = () => (
  <Table
    columns={columns}
    dataSource={data}
    onChange={onChange}
    style={{ fontSize: "1rem" }}
  />
);

export default CardTable;
