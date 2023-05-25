import React, { useEffect, useState } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Table, Tag } from "antd";
import {
  DatabaseFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "@/configs/axiosConfig";
import {
  novelListType,
  novelTableType,
  novelType,
} from "@/types/admin/novelType";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import AdminButton from "./AdminButton";
import Config from "@/configs/config.export";

export default function NovelList({ data }: any) {
  const router = useRouter();
  //const search = router.query.search ? router.query.search : "";
  //const select = router.query.select;

  const [novelData, setNovelData] = useState<novelListType>();
  const moveEditForm = (id: number) => {
    router.push(`/admin/novelForm?id=${id}`);
  };
  const moveNovelForm = () => {
    router.push("/admin/novelForm");
  };
  const baseUrl = Config().baseUrl;
  const deleteHandle = (id: number) => {
    axios
      .delete(`${baseUrl}/novels-service/v1/admin/novels/${id}`)
      .then((res) => {
        if (novelData !== undefined) {
          const newData = novelData.novelList.map((item: novelType) => {
            if (item.id === id) {
              return {
                ...item,
                serializationStatus: "삭제",
              };
            }
            return item;
          });
          setNovelData({ novelList: newData });
        }
      });
  };
  const moveNovelDetail = (id: number) => {
    router.push(`/admin/novels/${id}`);
  };

  useEffect(() => {
    console.log(data);
    setNovelData({
      novelList: data.data.contents,
    });
  }, []);

  // useEffect(() => {
  //   let url = "";
  //   if (select === "title") {
  //     url = `${baseUrl}/novels-service/v1/admin/novels?title=${search}`;
  //   } else if (select === "author") {
  //     url = `${baseUrl}/novels-service/v1/admin/novels?author=${search}`;
  //   } else {
  //     url = `${baseUrl}/novels-service/v1/admin/novels`;
  //   }

  //   axios.get(url).then((res) => {
  //     console.log(res.data.data.contents);
  //     setData1({
  //       novelList: res.data.data.contents,
  //     });
  //   });
  // }, []);

  const columns: ColumnsType<novelType> = [
    {
      //key: data1?.novelList.map(item=>item.id),
      dataIndex: "번호",
      title: "번호",
      sorter: (a, b) => a.id - b.id,
      width: "6%",
      render: (_, { id }) => <>{id}</>,
    },
    {
      //key: "이미지",
      dataIndex: "이미지",
      title: "이미지",
      width: "7%",
      render: (_, { thumbnail }) => <>{thumbnail}</>,
    },
    {
      //key: "제목",
      dataIndex: "제목",
      title: "제목",
      // filters: [
      //   {
      //     text: "Category 1",
      //     value: "Category 1",
      //   },
      //   {
      //     text: "Category 2",
      //     value: "Category 2",
      //   },
      // ],
      // filterMode: "tree",
      // filterSearch: true,
      // onFilter: (value: string | number | boolean, record) =>
      //   record.title.startsWith(value.toLocaleString()),
      width: "13%",
      render: (_, { id, title }) => (
        <div onClick={() => moveNovelDetail(id)}>{title}</div>
      ),
    },
    {
      // key: "작가",
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
        record.author.startsWith(value.toLocaleString()),
      width: "8%",
      render: (_, { author }) => <>{author}</>,
    },
    {
      //key: "연재시작일",
      dataIndex: "연재시작일",
      title: "연재시작일",
      sorter: (a, b) => Number(a.startDate) - Number(b.startDate),
      width: "12%",
      render: (_, { startDate }) => <>{startDate}</>,
    },

    {
      //key: "연재요일",
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
      //onFilter: (value: string | number | boolean, record) =>
      //record.serializationDay.startsWith(value.toLocaleString()),
      //filterSearch: true,
      width: "8%",
      render: (_, { serializationDay }) => <>{serializationDay}</>,
    },

    {
      //key: "장르",
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
      //key: "관람등급",
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
      //onFilter: (value: string | number | boolean, record) =>
      //record.grade.startsWith(value.toLocaleString()),
      filterSearch: true,
      width: "8%",
      render: (_, { grade }) => <>{grade}</>,
    },
    {
      //key: "태그",
      dataIndex: "태그",
      title: "태그",
      width: "13%",
      render: (_, { tags }) => (
        <>
          {tags.map((tag, idx) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
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
    console.log("params", pagination, filters, sorter, extra);
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
