import { Modal, Select, Space } from "antd";
import axios from "@/configs/axiosConfig";
import React, { useEffect, useState } from "react";
import { scheduleListType } from "@/types/admin/scheduleType";
import dayjs from "dayjs";
import { novelIdType, novelListType, novelType } from "@/types/admin/novelType";
import { cardNovelType } from "@/types/admin/cardType";
import { useRouter } from "next/router";

export default function CardModal(props: {
  id: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //모든 스케줄 목록과 소설 목록
  const [scheduleList, setScheduleList] = useState<scheduleListType>();
  const [novelList, setNovelList] = useState<novelListType>();

  const [scheduleId, setScheduleId] = useState<number>(props.id);
  const [selectIds, setSelectIds] = useState<number[]>([]);

  const [cardEditData, setCardEditData] = useState<cardNovelType[]>([]);
  //원래의 아이디 값들
  const [originIds, setOriginIds] = useState<number[]>([]);
  //select 에 띄우기 위한 용
  const [novelIdArray, setNovelIdArray] = useState<string[]>([]);

  //버튼 눌렀을 때
  const handleOk = async () => {
    const putHandle = async () => {
      const idList: novelIdType[] = [];
      selectIds.map((item) => {
        idList.push({ novelId: Number(item) });
      });

      const res = await axios.put(
        `/sections-service/v1/admin/schedules/novels/${scheduleId}`,
        {
          requestNovelIdList: idList,
        }
      );
    };

    const deleteHandle = async () => {
      const deleteValues = originIds.filter(
        (item) => !selectIds.includes(item)
      );

      const idList: novelIdType[] = [];
      deleteValues.map((item) => {
        idList.push({ novelId: Number(item) });
      });

      const res = await axios.delete(
        `/sections-service/v1/admin/schedules/novels`,
        {
          data: { requestNovelIdList: idList },
        }
      );
    };

    deleteHandle();
    putHandle();

    setSelectIds([]);

    props.setIsModalOpen(false);
  };

  //취소 버튼
  const handleCancel = () => {
    setSelectIds([]);
    props.setIsModalOpen(false);
  };

  //스케줄 선택
  const selectScheduleHandle = (selectValue: string) => {
    setScheduleId(Number(selectValue));
    getNovelData(Number(selectValue));
  };

  //소설 선택
  const selectNovelHandle = (selectValues: string[]) => {
    const selectNumbers = selectValues.map((item) => Number(item));

    setSelectIds(selectNumbers);

    setNovelIdArray(selectValues);
  };

  const getNovelData = async (novelId: number) => {
    const res = await axios.get(
      `/sections-service/v1/admin/schedules/novels/${novelId}`
    );
    setCardEditData(res.data.data.novelCardsBySchedules);
  };

  const getNovelsAndSchedules = async () => {
    const pageRes = await axios.get(`/novels-service/v1/admin/novels`);
    const totalPage = pageRes.data.data.pagination.totalPage;
    let newData: novelType[] = [];

    for (let page = 0; page < totalPage; page++) {
      const res = await axios.get(
        `/novels-service/v1/admin/novels?&page=${page}`
      );

      res.data.data.contents.map((item: novelType) => {
        newData.push(item);
      });
    }
    setNovelList({ novelList: newData });

    const scheduleRes = await axios.get(`/sections-service/v1/admin/schedules`);
    setScheduleList({ scheduleList: scheduleRes.data.data });
  };

  useEffect(() => {
    getNovelsAndSchedules();

    //등록 시
    if (props.id === 0) {
      setCardEditData([]);
    } //수정 시
    else {
      getNovelData(props.id);
    }
    setScheduleId(props.id);
  }, [props.isModalOpen, props.id]);

  useEffect(() => {
    //수정 시의 아이디들을 담음

    const novelEditIds = cardEditData.map((item) => item.novelId);

    setSelectIds(novelEditIds);

    setOriginIds(novelEditIds);

    const novelEditIdsString = cardEditData.map((item) =>
      item.novelId.toString()
    );

    setNovelIdArray(novelEditIdsString);
  }, [cardEditData]);

  interface optionType {
    value: string;
    label: string;
  }
  const novelOption: optionType[] = [];
  const scheduleOption: optionType[] = [];

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
            {props.id === 0 ? (
              <Select
                style={{ width: "280px" }}
                onChange={selectScheduleHandle}
                options={scheduleOption}
                disabled={props.id === 0 ? false : true}
              />
            ) : (
              <Select
                value={`${props.id}`}
                style={{ width: "280px" }}
                onChange={selectScheduleHandle}
                options={scheduleOption}
                disabled={props.id === 0 ? false : true}
              />
            )}
          </Space>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100px" }}>소설</div>
          <Select
            mode="multiple"
            onChange={selectNovelHandle}
            style={{ width: "100%" }}
            options={novelOption}
            value={novelIdArray}
          />
        </div>
      </div>
    </Modal>
  );
}
