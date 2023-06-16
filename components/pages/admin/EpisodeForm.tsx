import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Upload, Space } from "antd";
import React, { useEffect, useState } from "react";
import style from "@/components/pages/admin/EpisodeForm.module.css";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { episodeInputType } from "@/types/admin/episodeType";
import EpisodeInput from "@/components/ui/admin/EpisodeInput";
import EpisodeSelect from "@/components/ui/admin/EpisodeSelect";

import EpisodeDatePicker from "@/components/ui/admin/EpisodeDatePicker";
import EpisodeEditor from "@/components/ui/admin/EpisodeEditor";
import axios from "@/configs/axiosConfig";

export default function EpisodeForm() {
  const router = useRouter();
  const novelId = router.query.novel;
  const epiId = router.query.episode;

  const [inputData, setInputData] = useState<episodeInputType>({
    title: "",
    content: "",
    registration: dayjs(),
    createDate: dayjs(),
    updateDate: dayjs(),
    free: false,
    status: "",
  });
  useEffect(() => {
    if (!router.isReady) return;
    const getEpisodeData = async () => {
      const res = await axios.get(`/novels-service/v1/admin/episodes/${epiId}`);
      setInputData({
        title: res.data.data.title,
        content: res.data.data.content,
        registration: res.data.data.registration,
        createDate: res.data.data.createDate,
        updateDate: res.data.data.updateDate,
        free: res.data.data.free,
        status: res.data.data.status,
      });
    };
    if (epiId !== undefined) {
      getEpisodeData();
    }
  }, [router.isReady]);
  const cancelHandle = () => {
    router.push(`/admin/novels/${novelId}`);
  };
  const postHandle = () => {
    axios
      .post(`/novels-service/v1/admin/episodes`, {
        title: inputData.title,
        novelsId: novelId,
        content: inputData.content,
        registration: inputData.registration,
        createDate: inputData.createDate,
        updateDate: inputData.updateDate,
        free: inputData.free,
        status: inputData.status,
      })
      .then((res) => {
        router.push(`/admin/novels/${novelId}`);
      });
  };

  const putHandle = () => {
    axios.put(`/novels-service/v1/admin/episodes/${epiId}`, {
      title: inputData.title,
      novelsId: novelId,
      content: inputData.content,
      registration: inputData.registration,
      createDate: inputData.createDate,
      updateDate: inputData.updateDate,
      free: inputData.free,
      status: inputData.status,
    });

    router.push(`/admin/novels/${novelId}`);
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
            <Form.Item
              label="작품명"
              style={{ width: 600 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <EpisodeInput
                type={"title"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
            <Form.Item
              label="무료/유료"
              style={{ width: 600 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <EpisodeSelect
                type={"free"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>
          <div className={style.horizontal}>
            <Form.Item
              label="등록일"
              style={{ width: 300 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <EpisodeDatePicker
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
            <Form.Item
              label="상태"
              style={{ width: 300 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <EpisodeSelect
                type={"status"}
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>

          <div className={style.normal}>
            <Form.Item
              label="컨텐츠 (소설내용)"
              style={{ width: 1600 }}
              rules={[{ required: true, message: "${another} is required" }]}
            >
              <EpisodeEditor
                inputData={inputData}
                setInputData={setInputData}
              />
            </Form.Item>
          </div>

          <div className={style.button}>
            <Form.Item>
              <Space>
                {epiId === undefined ? (
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
