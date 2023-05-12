import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Upload, Space } from "antd";
import React, { useState } from "react";
import style from "@/components/pages/admin/EpisodeForm.module.css";
import dayjs from "dayjs";
import axios from "axios";
import { useRouter } from "next/router";

const { TextArea } = Input;

// const normFile = (e: any) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

export default function EpisodeForm(props: { id: number }) {
  const router = useRouter();
  const epiId = props.id;
  const [inputData, setInputData] = useState<inputEpisodeType>({
    title: "",
    author: "",
    grade: -1,
    genre: "",
    serializationStatus: "",
    authorComment: "",
    serializationDay: [],
    startDate: dayjs(),
    description: "",
    thumbnail: "",
    tags: [],
  });
  const cancelHandle = () => {
    router.push("/admin/episode"); //
  };
  const postHandle = () => {
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
        tags: inputData.tags,
      })
      .then((res) => {
        router.push("/admin/main");
      });
  };

  const putHandle = () => {
    axios
      .put(
        `http://43.200.189.164:8000/novels-service/v1/admin/novels/${novelId}`,
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
          tags: inputData.tags,
        }
      )
      .then((res) => {
        router.push("/admin/main");
      });
  };
  return (
    <>
      <div className={style.container}>
        <Form
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          style={{ maxWidth: 1500 }}
        >
          <div className={style.normal}>
            <Form.Item label="작품명" style={{ width: 600 }}>
              <Input value={epiData.title} />
            </Form.Item>
            <Form.Item label="무료/유료" style={{ width: 600 }}>
              <Input value={epiData.free} />
            </Form.Item>
          </div>
          <div className={style.horizontal}>
            <Form.Item label="등록일" style={{ width: 300 }}>
              <DatePicker value={epiData.registration} />
            </Form.Item>
            <Form.Item label="상태" style={{ width: 300 }}>
              <Select value={epiData.status}>
                <Select.Option value="demo">판매중</Select.Option>
                <Select.Option value="demo">판매전</Select.Option>
                <Select.Option value="demo">판매중지</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className={style.normal}>
            {" "}
            <Form.Item label="컨텐츠 (소설내용)" style={{ width: 1400 }}>
              <TextArea rows={12} value={epiData.content} />
            </Form.Item>
          </div>

          <div className={style.button}>
            <Form.Item>
              <Space>
                {episodeId === undefined ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => postHandle()}
                  >
                    등록
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => putHandle()}
                  >
                    수정
                  </Button>
                )}
                <Button htmlType="button" onClick={cancelHandle}>
                  취소
                </Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
}
