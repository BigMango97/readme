import React from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

interface DataType {
  번호: number;
  대표이미지: string;
  제목: string;
  작가: string;
  연재시작일: string;
  연재요일: string;
  장르: string;
  관람등급: string;
  태그: string[];
  연재상태: string;
}
const data: DataType[] = [
  {
    번호: 1,
    대표이미지: "/assets/images/dummy/bestItem01.png",
    제목: "진짜마지막이다.",
    작가: "김민공",
    연재시작일: "2020-12-12",
    연재요일: "금",
    장르: "로맨스",
    관람등급: "12",
    태그: ["로맨스", "사랑", "사랑"],
    연재상태: "연재중",
  },
  {
    번호: 2,
    대표이미지: "/assets/images/dummy/bestItem01.png",
    제목: "진짜마지막이다.",
    작가: "김민공",
    연재시작일: "2020-12-12",
    연재요일: "금",
    장르: "로맨스",
    관람등급: "12",
    태그: ["로맨스", "사랑1", "사랑"],
    연재상태: "연재중",
  },
  {
    번호: 3,
    대표이미지: "/assets/images/dummy/bestItem01.png",
    제목: "재미있어?.",
    작가: "김민공",
    연재시작일: "2020-12-12",
    연재요일: "금",
    장르: "로맨스",
    관람등급: "12",
    태그: ["로맨스", "사랑2", "사랑"],
    연재상태: "연재중",
  },
  {
    번호: 5,
    대표이미지: "/assets/images/dummy/bestItem01.png",
    제목: "진짜마지막이다.",
    작가: "김민공",
    연재시작일: "2020-12-12",
    연재요일: "금",
    장르: "로맨스",
    관람등급: "12",
    태그: ["로맨스", "사랑3", "사랑"],
    연재상태: "연재중",
  },
  {
    번호: 6,
    대표이미지: "/assets/images/dummy/bestItem01.png",
    제목: "진짜마지막이다.",
    작가: "김민공",
    연재시작일: "2020-12-12",
    연재요일: "금",
    장르: "로맨스",
    관람등급: "12",
    태그: ["로맨스", "사랑4", "사랑"],
    연재상태: "연재중",
  },
  {
    번호: 7,
    대표이미지: "/assets/images/dummy/bestItem01.png",
    제목: "즐겁니?.",
    작가: "김민공",
    연재시작일: "2020-12-12",
    연재요일: "금",
    장르: "로맨스",
    관람등급: "12",
    태그: ["로맨스", "사랑5", "사랑"],
    연재상태: "연재중",
  },
  {
    번호: 8,
    대표이미지: "/assets/images/dummy/bestItem01.png",
    제목: "진짜마지막이다.",
    작가: "김민공",
    연재시작일: "2020-12-12",
    연재요일: "월",
    장르: "로맨스",
    관람등급: "12",
    태그: ["로맨스", "사랑6", "사랑"],
    연재상태: "연재중",
  },
  {
    번호: 9,
    대표이미지: "/assets/images/dummy/bestItem01.png",
    제목: "재미있니?.",
    작가: "김민공",
    연재시작일: "2020-12-12",
    연재요일: "월",
    장르: "로맨스",
    관람등급: "12",
    태그: ["로맨스", "사랑7", "사랑"],
    연재상태: "연재중",
  },
  {
    번호: 10,
    대표이미지: "/assets/images/dummy/bestItem01.png",
    제목: "진짜마지막이다.",
    작가: "김민공",
    연재시작일: "2020-12-12",
    연재요일: "금",
    장르: "로맨스",
    관람등급: "19",
    태그: ["로맨스", "사랑8", "사랑"],
    연재상태: "연재중",
  },
  {
    번호: 11,
    대표이미지: "/assets/images/dummy/bestItem01.png",
    제목: "나는 신이다.",
    작가: "김민공",
    연재시작일: "2020-12-12",
    연재요일: "금",
    장르: "로맨스",
    관람등급: "12",
    태그: ["로맨스", "사랑9", "사랑"],
    연재상태: "연재중",
  },
  {
    번호: 12,
    대표이미지: "/assets/images/dummy/bestItem01.png",
    제목: "마지막이다.",
    작가: "김민공",
    연재시작일: "2020-12-12",
    연재요일: "금",
    장르: "로맨스",
    관람등급: "12",
    태그: ["로맨스", "사랑0", "사랑"],
    연재상태: "연재중",
  },
  {
    번호: 13,
    대표이미지: "/assets/images/dummy/bestItem01.png",
    제목: "나는 신이다.",
    작가: "김민공",
    연재시작일: "2020-12-12",
    연재요일: "금",
    장르: "로맨스",
    관람등급: "17",
    태그: ["로맨스", "사랑00", "사랑"],
    연재상태: "연재중",
  },
];

export default function NovelSortTable() {
  const router = useRouter();
  const moveEditForm = (id: number) => {
    router.push(`/admin/novelForm?id=${id}`);
  };

  const columns: ColumnsType<DataType> = [
    {
      key: "번호",
      dataIndex: "번호",
      title: "번호",
      sorter: (a, b) => a.번호 - b.번호,
      width: "6%",
    },
    {
      key: "이미지",
      dataIndex: "이미지",
      title: "이미지",
      width: "7%",
    },
    {
      key: "제목",
      dataIndex: "제목",
      title: "제목",
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
        record.제목.startsWith(value.toLocaleString()),
      width: "13%",
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
      width: "8%",
    },
    {
      key: "연재시작일",
      dataIndex: "연재시작일",
      title: "연재시작일",
      // sorter: (a, b) => a.age - b.age,
      width: "12%",
    },

    {
      key: "연재요일",
      dataIndex: "연재요일",
      title: "연재요일",
      filters: [
        {
          text: "월",
          value: "월",
        },
        {
          text: "화",
          value: "화",
        },
        {
          text: "수",
          value: "수",
        },
        {
          text: "목",
          value: "목",
        },
        {
          text: "금",
          value: "금",
        },
        {
          text: "토",
          value: "토",
        },
        {
          text: "일",
          value: "일",
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.연재요일.startsWith(value.toLocaleString()),
      filterSearch: true,
      width: "8%",
    },

    {
      key: "장르",
      dataIndex: "장르",
      title: "장르",
      filters: [
        {
          text: "판타지",
          value: "판타지",
        },
        {
          text: "현판",
          value: "현판",
        },
        {
          text: "무협",
          value: "무협",
        },
        {
          text: "로맨스",
          value: "로맨스",
        },
        {
          text: "로판",
          value: "로판",
        },
        {
          text: "드라마",
          value: "드라마",
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.장르.startsWith(value.toLocaleString()),
      filterSearch: true,
      width: "6%",
    },

    {
      key: "관람등급",
      dataIndex: "관람등급",
      title: "관람등급",
      filters: [
        {
          text: "전체",
          value: "전체",
        },
        {
          text: "19",
          value: "19",
        },
        {
          text: "17",
          value: "17",
        },
        {
          text: "15",
          value: "15",
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.관람등급.startsWith(value.toLocaleString()),
      filterSearch: true,
      width: "8%",
    },
    {
      key: "태그",
      dataIndex: "태그",
      title: "태그",
      width: "13%",
      render: (_, { 태그 }) => (
        <>
          {태그.map((tag, idx) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={idx}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      key: "연재상태",
      dataIndex: "연재상태",
      title: "연재상태",
      filters: [
        {
          text: "연재중",
          value: "연재중",
        },
        {
          text: "완결",
          value: "완결",
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.연재상태.startsWith(value.toLocaleString()),
      filterSearch: true,
      width: "8%",
    },
    {
      key: "수정",
      dataIndex: "수정",
      title: "수정",
      width: "5%",
      render: () => <EditOutlined onClick={() => moveEditForm(9)} />,
    },
    {
      key: "삭제",
      dataIndex: "삭제",
      title: "삭제",
      width: "5%",
      render: () => <DeleteOutlined />,
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

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      style={{ fontSize: "1rem" }}
    />
  );
}
