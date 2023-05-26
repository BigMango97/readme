import { Modal, Select, Space } from "antd";
import axios from "@/configs/axiosConfig";
import React, { useEffect, useState } from "react";
import { scheduleListType } from "@/types/admin/scheduleType";
import dayjs from "dayjs";
import { novelListType } from "@/types/admin/novelType";
import { cardEditType } from "@/types/admin/cardType";

export default function CardModal(props: {
  id: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [scheduleList, setScheduleList] = useState<scheduleListType>();
  const [novelList, setNovelList] = useState<novelListType>();

  const [scheduleId, setScheduleId] = useState<number>();
  const [novelIds, setNovelIds] = useState<number[]>();
  const [cardEditData, setCardEditData] = useState<cardEditType>({
    scheduleId: 0,
    scheduleName: "",
    novelCardsList: [],
  });
  const handleOk = () => {
    //카드 등록
    if (props.id === 0) {
      novelIds?.map((novelId) => {
        axios
          .patch(`/sections-service/v1/admin/cards/novels/${novelId}`, {
            scheduleId: scheduleId,
          })
          .then((res) => {
            console.log(res);
          });
      });
    }
    //카드 수정
    else {
      //edit에는 있는데 ids에는 없으면 삭제 ids에는 있는데 edit에 없으면 추가
      const deleteIds = novelIds?.map((ids) => {
        return cardEditData.novelCardsList.filter((item) => {
          item.novelId !== ids;
        });
      });
      console.log("deleteIds", deleteIds);
      // deleteIds?.map(id=>{
      //   axios.delete(`/sections-service/v1/admin/cards/novels/${id}`)
      //         .then((res) => {
      //           console.log(res);
      //         })})
      const addIds = cardEditData.novelCardsList.map((item) => {
        return novelIds?.filter((ids) => {
          ids !== item.novelId;
        });
      });
      console.log("addIds", addIds);
      // addIds?.map((novelId) => {
      //   axios
      //     .patch(`/sections-service/v1/admin/cards/novels/${novelId}`, {
      //       scheduleId: scheduleId,
      //     })
      //     .then((res) => {
      //       console.log(res);
      //     });
      // });
    }

    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  //스케줄 선택
  const selectScheduleHandle = (selectValue: string) => {
    setScheduleId(Number(selectValue));
  };
  //소설 선택
  const selectNovelHandle = (selectValues: string[]) => {
    const values = selectValues.map((item) => {
      return Number(item);
    });
    setNovelIds(values);
  };

  useEffect(() => {
    axios.get(`/novels-service/v1/admin/novels`).then((res) => {
      setNovelList({ novelList: res.data.data.contents });
    });
    axios.get(`/sections-service/v1/admin/schedules`).then((res) => {
      setScheduleList({ scheduleList: res.data.data });
    });
    //수정 시
    if (props.id !== 0) {
      axios
        .get(
          `/sections-service/v1/cards/novels/schedules?scheduleId=${props.id}`
        )
        .then((res) => {
          console.log("res", res.data.data);
          setCardEditData({
            scheduleId: res.data.data.scheduleId,
            scheduleName: res.data.data.scheduleName,
            novelCardsList: res.data.data.novelCardsList,
          });
        });
    }
  }, [props.id]);

  interface optionType {
    value: string;
    label: string;
  }
  const novelOption: optionType[] = [];
  novelList?.novelList.map((item) => {
    novelOption.push({ value: item.id.toString(), label: item.title });
  });

  const scheduleOption: optionType[] = [];
  scheduleList?.scheduleList.map((item) => {
    scheduleOption.push({ value: item.id.toString(), label: item.name });
  });
  //const novelTitles = cardEditData.novelCardsList.map(item=>{return item.novelTitle})

  return (
    <Modal
      title={props.id === 0 ? "카드등록" : "카드수정"}
      open={props.isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div style={{ margin: "30px 0px" }}>
        <div style={{ display: "flex", margin: "20px 0px" }}>
          <div style={{ width: "80px" }}>스케줄</div>
          <Space wrap>
            <Select
              defaultValue={cardEditData.scheduleName}
              style={{ width: "280px" }}
              onChange={selectScheduleHandle}
              options={scheduleOption}
            />
          </Space>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100px" }}>소설</div>
          <Select
            mode="multiple"
            value={novelIds?.map((item) => {
              return item.toString();
            })}
            onChange={selectNovelHandle}
            style={{ width: "100%" }}
            options={novelOption}
            defaultValue={cardEditData.novelCardsList.map((item) => {
              return item.novelTitle;
            })}
          />
        </div>
      </div>
    </Modal>
  );
}
