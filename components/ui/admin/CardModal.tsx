import { Modal, Select, Space } from "antd";
import axios from "@/configs/axiosConfig";
import React, { useEffect, useState } from "react";
import { scheduleListType } from "@/types/admin/scheduleType";
import dayjs from "dayjs";
import { novelListType } from "@/types/admin/novelType";
import { novelOptionType, novelType } from "@/types/admin/cardType";
import { useRouter } from "next/router";

export default function CardModal(props: {
  id: number;
  scheduleName: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //모든 스케줄 목록과 소설 목록
  const [scheduleList, setScheduleList] = useState<scheduleListType>();
  const [novelList, setNovelList] = useState<novelListType>();

  const [scheduleId, setScheduleId] = useState<number>();
  const [novelIds, setNovelIds] = useState<string[]>([]);
  const [cardEditData, setCardEditData] = useState<novelType[]>([]);
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
      const cardIds = cardEditData.map((item) => item.novelId.toString());
      const deleteIds = novelIds.filter((item) => !cardIds.includes(item));
      const addIds = cardIds.filter((item) => !novelIds.includes(item));
      console.log("deleteIds", deleteIds);
      console.log("addIds", addIds);
      // console.log("select", novelIds);
      // deleteIds?.map((id) => {
      //   axios
      //     .delete(`/sections-service/v1/admin/cards/novels/${id}`)
      //     .then((res) => {
      //       console.log(res);
      //     });
      // });
      // const addIds = cardEditData.map((item) => {
      //   return novelIds?.filter((ids) => {
      //     ids !== item.novelId.toString();
      //   });
      // });
      // console.log("addIds", addIds);
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
    setNovelIds([]);
  };

  //스케줄 선택
  const selectScheduleHandle = (selectValue: string) => {
    setScheduleId(Number(selectValue));
  };
  //소설 선택

  const selectNovelHandle = (selectValues: string[]) => {
    const values = selectValues.map((item) => {
      return item;
    });

    //const deleteIds = novelIds.filter((item) => !values.includes(item));
    //console.log("deleteIds", deleteIds);
    //const addIds = values.filter((item) => !novelIds.includes(item));
    //console.log("addIds", addIds);
    setNovelIds(values);
  };

  const novelOption: optionType[] = [];
  const scheduleOption: optionType[] = [];
  const router = useRouter();
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
        .get(`/sections-service/v1/admin/schedules/novels/${props.id}`)
        .then((res) => {
          setCardEditData(res.data.data.novelCardsBySchedules);
        });
    }
  }, [props.isModalOpen, props.id]);

  useEffect(() => {
    const novelEditIds = cardEditData.map((item) => item.novelId.toString());
    setNovelIds(novelEditIds);
  }, [cardEditData]);

  interface optionType {
    value: string;
    label: string;
  }
  novelList?.novelList.map((item) => {
    novelOption.push({ value: item.id.toString(), label: item.title });
  });

  scheduleList?.scheduleList.map((item) => {
    scheduleOption.push({ value: item.id.toString(), label: item.name });
  });

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
              value={props.scheduleName}
              style={{ width: "280px" }}
              onChange={selectScheduleHandle}
              options={scheduleOption}
              disabled={props.id === 0 ? false : true}
            />
          </Space>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100px" }}>소설</div>
          <Select
            mode="multiple"
            onChange={selectNovelHandle}
            style={{ width: "100%" }}
            options={novelOption}
            value={novelIds}
          />
        </div>
      </div>
    </Modal>
  );
}
