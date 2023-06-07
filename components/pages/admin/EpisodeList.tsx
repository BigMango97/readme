import React, { useEffect, useState } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import {
  episodeListType,
  episodeTableType,
  episodeType,
} from "@/types/admin/episodeType";
import axios from "@/configs/axiosConfig";

export default function EpisodeList() {
  const router = useRouter();
  const novelId = router.query.novelId;

  const [epiData, setEpiData] = useState<episodeListType>({ episodeList: [] });

  const moveEpisodeDetail = (id: number) => {
    router.push(`/admin/novels/${novelId}/episodes/${id}`);
  };
  const moveEditForm = (id: number) => {
    router.push(`/admin/episodeForm?novel=${novelId}&episode=${id}`);
  };

  const deleteHandle = (id: number) => {
    axios.delete(`/novels-service/v1/admin/episodes/${id}`).then((res) => {
      if (epiData !== undefined) {
        const newData = epiData.episodeList.map((item: episodeType) => {
          if (item.id === id) {
            return {
              ...item,
              status: "삭제",
            };
          }
          return item;
        });
        setEpiData({ episodeList: newData });
      }
    });
  };

  const getData = async () => {
    const pageRes = await axios.get(
      `/novels-service/v1/admin/episodes?novelId=${novelId}&page=0`
    );
    const totalPage = pageRes.data.data.pagination.totalPage;
    let newData: episodeType[] = [];

    for (let page = 0; page < totalPage; page++) {
      const res = await axios.get(
        `/novels-service/v1/admin/episodes?novelId=${novelId}&page=${page}`
      );
      res.data.data.contents.map((item: episodeType) => {
        newData.push(item);
      });
    }

    setEpiData({ episodeList: newData });
  };

  useEffect(() => {
    if (!router.isReady) return;
    getData();
  }, [router.isReady]);

  const columns: ColumnsType<episodeType> = [
    {
      dataIndex: "번호",
      title: "번호",
      sorter: (a, b) => a.id - b.id,
      width: "6%",
      render: (_, { id }) => <>{id}</>,
    },
    {
      dataIndex: "제목",
      title: "제목",
      width: "13%",
      render: (_, { id, title }) => (
        <div onClick={() => moveEpisodeDetail(id)}>{title}</div>
      ),
    },

    {
      dataIndex: "등록일",
      title: "등록일",
      width: "12%",
      render: (_, { createDate }) => (
        <>{createDate.toString().substring(0, 10)}</>
      ),
    },
    {
      dataIndex: "수정일",
      title: "수정일",

      width: "12%",
      render: (_, { updateDate }) => (
        <>{updateDate.toString().substring(0, 10)}</>
      ),
    },
    {
      dataIndex: "무료/유료",
      title: "무료/유료",
      filters: [
        {
          text: "무료",
          value: true,
        },
        {
          text: "유료",
          value: false,
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.free === value,
      width: "13%",
      render: (_, { free }) => <>{free ? "무료" : "유료"}</>,
    },
    {
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
      width: "8%",
      render: (_, { status }) => <>{status}</>,
    },
    {
      dataIndex: "수정",
      title: "수정",
      width: "5%",
      render: (_, { id }) => <EditOutlined onClick={() => moveEditForm(id)} />,
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

  const onChange: TableProps<episodeType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    //console.log("params", pagination, filters, sorter, extra);
  };

  const dataSource: episodeTableType[] = [];
  epiData?.episodeList.map((item) => {
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
