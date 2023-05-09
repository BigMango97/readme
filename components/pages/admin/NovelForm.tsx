import { PlusOutlined } from "@ant-design/icons";
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
import React, { useState } from "react";
import AdminTag from "@/components/ui/adminTag";
import style from "@/components/pages/admin/NovelForm.module.css";
import dayjs from "dayjs";

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function NovelForm(props: { id: number }) {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  //-1은 등록 0부터 수정
  const novelData = {
    novelId: 0,
    title: "",
    description: "",
    author: "",
    genre: "",
    grade: "",
    thumbnail: "",
    startDate: dayjs(),
    serializationDays: "",
    views: "",
    serializationStatus: "",
    authorComment: "",
    tag: [
      {
        id: 0,
        name: "",
      },
    ],
  };
  if (props.id >= 0) {
    //useEffect axios.get
    //
  }
  return (
    <>
      <div className={style.container}>
        <Form
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          disabled={componentDisabled}
          style={{ maxWidth: 1500 }}
        >
          <div className={style.horizontal}>
            <Form.Item label="작품명" style={{ width: 600 }}>
              <Input value={novelData.title} />
            </Form.Item>
            <Form.Item label="작가" style={{ width: 600 }}>
              <Input value={novelData.author} />
            </Form.Item>
          </div>
          <div className={style.horizontal}>
            <Form.Item label="관람등급" style={{ width: 300 }}>
              <Select value={novelData.grade}>
                <Select.Option value="demo">전체연령가</Select.Option>
                <Select.Option value="demo">12세</Select.Option>
                <Select.Option value="demo">15세</Select.Option>
                <Select.Option value="demo">19세</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="장르" style={{ width: 300 }}>
              <Select value={novelData.genre}>
                <Select.Option value="demo">판타지</Select.Option>
                <Select.Option value="demo">현판</Select.Option>
                <Select.Option value="demo">로맨스</Select.Option>
                <Select.Option value="demo">로판</Select.Option>
                <Select.Option value="demo">무협</Select.Option>
                <Select.Option value="demo">드라마</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="연재상태" style={{ width: 300 }}>
              <Select value={novelData.serializationStatus}>
                <Select.Option value="demo">연재중</Select.Option>
                <Select.Option value="demo">휴재</Select.Option>
                <Select.Option value="demo">완결</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item label="작가의 말" style={{ width: 640 }}>
              <Input value={novelData.authorComment} />
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item
              label="연재 요일"
              name="disabled"
              valuePropName="checked"
              style={{ width: 640 }}
            >
              <Checkbox>월</Checkbox>
              <Checkbox>화</Checkbox>
              <Checkbox>수</Checkbox>
              <Checkbox>목</Checkbox>
              <Checkbox>금</Checkbox>
              <Checkbox>토</Checkbox>
              <Checkbox>일</Checkbox>
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item label="연재 시작일" style={{ width: 300 }}>
              <DatePicker value={novelData.startDate} />
            </Form.Item>
          </div>
          <div className={style.horizontal}>
            <Form.Item label="작품소개" style={{ width: 640 }}>
              <TextArea rows={4} value={novelData.description} />
            </Form.Item>
            <Form.Item
              label="대표 이미지"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item label="태그 (최대 3개)" style={{ width: 640 }}>
              <AdminTag tags={novelData.tag} />
            </Form.Item>
          </div>
          <div className={style.button}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  등록
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
