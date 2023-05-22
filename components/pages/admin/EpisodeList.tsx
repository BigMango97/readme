import React, { useEffect, useState } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";
import { novelListType, novelType } from "@/types/admin/novelType";
import { NextPageContext } from "next";
import dayjs from "dayjs";
import {
  episodeListType,
  episodeTableType,
  episodeType,
} from "@/types/admin/episodeType";
import Config from "@/configs/config.export";

export default function EpisodeList() {
  const router = useRouter();
  const novelId = router.query.novelId;
  const baseUrl = Config().baseUrl;
  const [data1, setData1] = useState<episodeListType>();
  const moveEpisodeDetail = (id: number) => {
    router.push(`/admin/novels/${novelId}/episodes/${id}`);
  };
  const moveEditForm = (id: number) => {
    router.push(`/admin/episodeForm?id=${id}`);
  };

  const deleteHandle = (id: number) => {
    axios
      .delete(
        `${baseUrl}/novels-service/v1/admin/episodes/${id}`
      )
      .then((res) => {
        console.log(res);
      });
  };
  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(
        `${baseUrl}/novels-service/v1/admin/episodes?novelId=${novelId}&page=0`
      )
      .then((res) => {
        console.log(res.data.data.contents);

        setData1({
          episodeList: res.data.data.contents,
        });
      });
  }, [router.isReady]);

  const columns: ColumnsType<episodeType> = [
    {
      //key: "번호",
      dataIndex: "번호",
      title: "번호",
      sorter: (a, b) => a.id - b.id,
      width: "6%",
      render: (_, { id }) => <>{id}</>,
    },
    {
      //key: "제목",
      dataIndex: "제목",
      title: "제목",
      filters: [
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
        record.title.startsWith(value.toLocaleString()),
      width: "13%",
      render: (_, { id, title }) => (
        <div onClick={() => moveEpisodeDetail(id)}>{title}</div>
      ),
    },

    {
      //key: "등록일",
      dataIndex: "등록일",
      title: "등록일",
      sorter: (a, b) => Number(a.createDate) - Number(b.createDate),
      width: "12%",
      render: (_, { createDate }) => <>{createDate}</>,
    },
    {
      //key: "수정일",
      dataIndex: "수정일",
      title: "수정일",
      sorter: (a, b) => Number(a.updateDate) - Number(b.updateDate),
      width: "12%",
      render: (_, { updateDate }) => <>{updateDate}</>,
    },
    {
      //key: "무료/유료",
      dataIndex: "무료/유료",
      title: "무료/유료",
      filters: [
        {
          text: "무료",
          value: "무료",
        },
        {
          text: "유료",
          value: "유료",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string | number | boolean, record) =>
        record.title.startsWith(value.toLocaleString()),
      width: "13%",
      render: (_, { free }) => <>{free ? "무료" : "유료"}</>,
    },
    {
      //key: "회차상태",
      dataIndex: "회차상태",
      title: "회차상태",
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
        record.status.startsWith(value.toLocaleString()),
      filterSearch: true,
      width: "8%",
      render: (_, { status }) => <>{status}</>,
    },
    {
      //key: "수정",
      dataIndex: "수정",
      title: "수정",
      width: "5%",
      render: (_, { id }) => <EditOutlined onClick={() => moveEditForm(id)} />,
    },
    {
      //key: "삭제",
      dataIndex: "삭제",
      title: "삭제",
      width: "5%",
      render: (_, { id }) => (
        <DeleteOutlined onClick={() => deleteHandle(id)} />
      ),
    },
  ];

  const onChange: TableProps<episodeType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const dataSource: episodeTableType[] = [];
  data1?.episodeList.map((item) => {
    dataSource.push({
      key: item.id,
      id: item.id,
      novelId: item.novelId,
      title: item.title,
      content: item.content,
      registration: item.registration,
      createDate: item.createDate,
      updateDate: item.updateDate,
      free: item.free,
      status: item.status,
    });
  });

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      onChange={onChange}
      style={{ fontSize: "1rem" }}
    />
  );
}
export async function getServerSideProps() {
  const baseUrl = Config().baseUrl;
  // Fetch data from external API
  const res = await axios.get(
    `${baseUrl}/novels-service/v1/admin/novels`
  );
  //console.log("레스  = ", res);
  //const resData = await res.data;
  //console.log("sssr = ", data3);
  //const data = await res.data;

  // Pass data to the page via props
  return { props: { data: res.data } };
}
