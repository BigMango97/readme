import React, { useEffect, useState } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "@/configs/axiosConfig";
import { Image } from "antd";
import {
  novelListType,
  novelTableType,
  novelType,
} from "@/types/admin/novelType";
import AdminButton from "./AdminButton";

export default function NovelList() {
  const router = useRouter();
  const search = router.query.search ? router.query.search : "";
  const select = router.query.select;

  const [novelData, setNovelData] = useState<novelListType>();
  const moveEditForm = (id: number) => {
    router.push(`/admin/novelForm?id=${id}`);
  };
  const moveNovelForm = () => {
    router.push("/admin/novelForm");
  };

  const deleteHandle = (id: number) => {
    axios.delete(`/novels-service/v1/admin/novels/${id}`).then((res) => {
      getData();
    });
  };
  const moveNovelDetail = (id: number) => {
    router.push(`/admin/novels/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let url = "";
    if (select === "title") {
      url = `/novels-service/v1/admin/novels?title=${search}`;
    } else if (select === "author") {
      url = `/novels-service/v1/admin/novels?author=${search}`;
    } else {
      url = `/novels-service/v1/admin/novels?`;
    }

    const pageRes = await axios.get(url);

    const totalPage = pageRes.data.data.pagination.totalPage;
    console.log(pageRes.data.data);
    let newData: novelType[] = [];

    for (let page = 0; page < totalPage; page++) {
      const res = await axios.get(url + `&page=${page}`);
      res.data.data.contents.map((item: novelType) => {
        newData.push(item);
      });
    }

    setNovelData({
      novelList: newData,
    });
  };

  const columns: ColumnsType<novelType> = [
    {
      dataIndex: "번호",
      title: "번호",
      sorter: (a, b) => a.id - b.id,
      width: "5%",
      render: (_, { id }) => <>{id}</>,
    },
    {
      dataIndex: "이미지",
      title: "이미지",
      width: "7%",
      render: (_, { thumbnail }) => <Image width={80} src={thumbnail} />,
    },
    {
      dataIndex: "작품명",
      title: "작품명",

      width: "13%",
      render: (_, { id, title }) => (
        <div onClick={() => moveNovelDetail(id)}>{title}</div>
      ),
    },
    {
      dataIndex: "작가",
      title: "작가",
      width: "8%",
      render: (_, { author }) => <>{author}</>,
    },
    {
      dataIndex: "연재시작일",
      title: "연재시작일",
      sorter: (a, b) => Number(a.startDate) - Number(b.startDate),
      width: "12%",
      render: (_, { startDate }) => (
        <>{startDate.toString().substring(0, 10)}</>
      ),
    },
    {
      dataIndex: "연재요일",
      title: "연재요일",
      width: "10%",
      render: (_, { serializationDay }) => (
        <>
          {serializationDay.map((tag, idx) => {
            let color = "cyan";
            return (
              <div key={idx}>
                <Tag color={color}>{tag.toUpperCase()}</Tag>
              </div>
            );
          })}
        </>
      ),
    },

    {
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
        record.genre.startsWith(value.toLocaleString()),
      filterSearch: true,
      width: "6%",
      render: (_, { genre }) => <>{genre}</>,
    },

    {
      dataIndex: "관람등급",
      title: "관람등급",
      filters: [
        {
          text: "전체",
          value: "0",
        },
        {
          text: "19",
          value: "19",
        },
        {
          text: "12",
          value: "12",
        },
        {
          text: "15",
          value: "15",
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.grade.toString().startsWith(value.toLocaleString()),
      filterSearch: true,
      width: "8%",
      render: (_, { grade }) => (
        <>
          {grade === 0
            ? "전체"
            : grade === 19
            ? "19"
            : grade === 12
            ? "12"
            : "15"}
        </>
      ),
    },
    {
      dataIndex: "태그",
      title: "태그",
      width: "13%",
      render: (_, { tags }) => (
        <>
          {tags.map((tag, idx) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            return (
              <div key={idx}>
                <Tag color={color}>{tag.toUpperCase()}</Tag>
              </div>
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
        {
          text: "휴재",
          value: "휴재",
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.serializationStatus.startsWith(value.toLocaleString()),
      filterSearch: true,
      width: "8%",
      render: (_, { serializationStatus }) => <>{serializationStatus}</>,
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

  const onChange: TableProps<novelType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    ///console.log("params", pagination, filters, sorter, extra);
  };

  const dataSource: novelTableType[] = [];
  novelData?.novelList.map((item) => {
    dataSource.push({
      key: item.id,
      id: item.id,
      title: item.title,
      description: item.description,
      author: item.author,
      startDate: item.startDate,
      serializationDay: item.serializationDay,
      serializationStatus: item.serializationStatus,
      thumbnail: item.thumbnail,
      authorComment: item.authorComment,
      grade: item.grade,
      genre: item.genre,
      tags: item.tags,
    });
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          margin: "1rem",
        }}
      >
        <AdminButton title="소설등록" onClick={moveNovelForm} />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        style={{ fontSize: "1rem" }}
      />
    </>
  );
}
