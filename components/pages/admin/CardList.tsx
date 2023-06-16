import React, { useEffect, useState } from "react";
import CardTable from "./CardTable";
import AdminButton from "./AdminButton";
import CardModal from "@/components/ui/admin/CardModal";
import { cardListType } from "@/types/admin/cardType";
import axios from "@/configs/axiosConfig";

export default function CardList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState<number>(0);
  const [cardData, setCardData] = useState<cardListType>({ cardList: [] });

  useEffect(() => {
    axios.get(`/sections-service/v1/admin/schedules/novels`).then((res) => {
      setCardData({ cardList: res.data.data });
    });
  }, [isModalOpen]);

  const showModal = () => {
    setModalId(0);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          margin: "1rem",
        }}
      >
        <AdminButton title={"카드등록"} onClick={showModal} />
      </div>
      <CardModal
        id={modalId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <CardTable
        cardData={cardData}
        setCardData={setCardData}
        setIsModalOpen={setIsModalOpen}
        setModalId={setModalId}
      />
    </>
  );
}
