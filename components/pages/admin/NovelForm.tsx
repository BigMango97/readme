import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import NovelTag from "@/components/ui/admin/NovelTag";
import style from "@/components/pages/admin/NovelForm.module.css";
import dayjs from "dayjs";
import axios from "axios";

import NovelInput from "@/components/ui/admin/NovelInput";
import NovelSelect from "@/components/ui/admin/NovelSelect";
import NovelCheckbox from "@/components/ui/admin/NovelCheckbox";
import NovelDatePicker from "@/components/ui/admin/NovelDatePicker";
import NovelTextArea from "@/components/ui/admin/NovelTextArea";
import NovelUpload from "@/components/ui/admin/NovelUpload";
import { inputNovelType, tagType } from "@/types/admin/novelType";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
export default function NovelForm(props: { id: number }) {
  //-1은 등록 0부터 수정

  const submitHandle = () => {
    if (props.id === -1) {
      axios
        .post(`http://43.200.189.164:8000/novels-service/v1/admin/novels`, {
          title: inputData.title,
          author: inputData.author,
          grade: inputData.grade,
          genre: inputData.genre,
          serializationStatus: inputData.serializationStatus,
          authorComment: inputData.authorComment,
          serializationDay: inputData.serializationDay,
          startDate: inputData.startDate,
          description: inputData.description,
          thumbnail: inputData.thumbnail,
          tag: inputData.tag,
        })
        .then((res) => {
          console.log("res = ", res);
        });
    } else {
      axios
        .put(
          `http://43.200.189.164:8000/novels-service/v1/admin/novels/${props.id}`,
          {
            title: inputData.title,
            author: inputData.author,
            grade: inputData.grade,
            genre: inputData.genre,
            serializationStatus: inputData.serializationStatus,
            authorComment: inputData.authorComment,
            serializationDay: inputData.serializationDay,
            startDate: inputData.startDate,
            description: inputData.description,
            thumbnail: inputData.thumbnail,
            tag: inputData.tag,
          }
        )
        .then((res) => {
          console.log("res = ", res);
        });
    }
  };

  const [inputData, setInputData] = useState<inputNovelType>({
    title: "",
    author: "",
    grade: 0,
    genre: "",
    serializationStatus: "",
    authorComment: "",
    serializationDay: [],
    startDate: new Date(),
    description: "",
    thumbnail: "",
    tag: [],
  });

  return (
    <>
      <div className={style.container}>
        <Form
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          style={{ maxWidth: 1500 }}
        >
          <div className={style.horizontal}>
            <Form.Item label="작품명" style={{ width: 600 }}>
              <NovelInput
                type={"title"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
            <Form.Item label="작가" style={{ width: 600 }}>
              <NovelInput
                type={"author"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>
          <div className={style.horizontal}>
            <Form.Item label="관람등급" style={{ width: 300 }}>
              <NovelSelect
                type={"grade"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
            <Form.Item label="장르" style={{ width: 300 }}>
              <NovelSelect
                type={"genre"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
            <Form.Item label="연재상태" style={{ width: 300 }}>
              <NovelSelect
                type={"serializationStatus"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item label="작가의 말" style={{ width: 640 }}>
              <NovelInput
                type={"authorComment"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item
              label="연재 요일"
              name="disabled"
              valuePropName="checked"
              style={{ width: 640 }}
            >
              <NovelCheckbox
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item label="연재 시작일" style={{ width: 300 }}>
              <NovelDatePicker
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>
          <div className={style.horizontal}>
            <Form.Item label="작품소개" style={{ width: 640 }}>
              <NovelTextArea
                rows={4}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
            <Form.Item
              label="대표 이미지"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <NovelUpload inputData={inputData} setInputData={setInputData} />
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item label="태그 (최대 3개)" style={{ width: 640 }}>
              <NovelTag inputData={inputData} setInputData={setInputData} />
            </Form.Item>
          </div>
          <div className={style.button}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => submitHandle()}
                >
                  {props.id === -1 ? "등록" : "수정"}
                </Button>
                <Button htmlType="button">취소</Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
}
