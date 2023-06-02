import React, { useEffect, useState } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "@/configs/axiosConfig";
//import axios from "axios";
import {
  cardColumnsType,
  cardListType,
  cardTableType,
  cardType,
} from "@/types/admin/cardType";
import CardModal from "@/components/ui/admin/CardModal";
import Config from "@/configs/config.export";
import { useCookies } from "react-cookie";

export default function CardTable() {
  const [editId, setEditId] = useState<number>(0);
  const [editScheduleName, setEditScheduleName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardData, setCardData] = useState<cardListType>();

  useEffect(() => {
    axios.get(`/sections-service/v1/admin/schedules/novels`).then((res) => {
      setCardData({ cardList: res.data.data });
    });
  }, []);

  const showEditModal = (id: number, name: string) => {
    setEditId(id);
    setEditScheduleName(name);
    setIsModalOpen(!isModalOpen);
  };
  const deleteHandle = (id: number) => {
    axios.delete(`/sections-service/v1/admin/schedules/${id}`).then((res) => {
      // setCardData({cardList: cardData?.cardList.map(item=>{
      //   item.
      // })})
    });
  };

  const dataSource: cardTableType[] = [];

  //console.log("cardData", cardData);
  cardData?.cardList.map((item) => {
    let novelNames = "",
      novelIds = "";
    item.novelCardsList.map((item2) => {
      novelIds = item2.novelId + "/" + novelIds;
      novelNames = item2.novelTitle + "/" + novelNames;
    });

    // item.novelCardsList.map((item2) => {
    //   novelNames = item2.novelTitle + "/" + novelNames;
    // });
    dataSource.push({
      key: item.scheduleId,
      scheduleId: item.scheduleId,
      scheduleName: item.scheduleName,
      startDate: item.startDate,
      endDate: item.endDate,
      novelIds: novelIds,
      novelNames: novelNames,
    });
  });

  const columns: ColumnsType<cardColumnsType> = [
    {
      //key: "번호",
      dataIndex: "스케줄번호",
      title: "스케줄번호",
      sorter: (a, b) => a.scheduleId - b.scheduleId,
      width: "7%",
      render: (_, { scheduleId }) => <>{scheduleId}</>,
    },
    {
      key: "스케줄명",
      dataIndex: "스케줄명",
      title: "스케줄명",
      width: "10%",
      render: (_, { scheduleName }) => <>{scheduleName}</>,
    },
    {
      key: "작품번호",
      dataIndex: "작품번호",
      title: "작품번호",
      width: "13%",
      render: (_, { novelIds }) => <>{novelIds}</>,
    },
    {
      key: "작품명",
      dataIndex: "작품명",
      title: "작품명",
      width: "13%",
      render: (_, { novelNames }) => <>{novelNames}</>,
    },
    {
      key: "이벤트기간",
      dataIndex: "이벤트기간",
      title: "이벤트기간",
      width: "13%",
      render: (_, { startDate, endDate }) => <>{`${startDate} ~ ${endDate}`}</>,
    },
    {
      key: "수정",
      dataIndex: "수정",
      title: "수정",
      width: "3%",
      render: (_, { scheduleId, scheduleName }) => (
        <EditOutlined onClick={() => showEditModal(scheduleId, scheduleName)} />
      ),
    },
    {
      key: "삭제",
      dataIndex: "삭제",
      title: "삭제",
      width: "3%",
      render: (_, { scheduleId }) => (
        <DeleteOutlined onClick={() => deleteHandle(scheduleId)} />
      ),
    },
  ];

  // const onChange: TableProps<cardTableType>["onChange"] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };

  return (
    <>
      <CardModal
        id={editId}
        //scheduleName={editScheduleName}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        //onChange={onChange}
        style={{ fontSize: "1rem" }}
      />
    </>
  );
}
