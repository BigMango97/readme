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
import style from "@/components/pages/admin/EpisodeView.module.css";
import dayjs from "dayjs";

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function EpisodeView() {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const epiData = {
    id: 0,
    title: "멋진소설제목",
    content: "",
    registration: "",
    free: "",
    status: "",
    createDate: "",
    updateDate: "",
  };

  return (
    <>
      <div className={style.container}>
        <Form
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          disabled={componentDisabled}
          style={{ maxWidth: 2000 }}
        >
          <div className={style.horizontal}>
            <Form.Item label="작품명" style={{ width: 500 }}>
              <Input value={epiData.title} />
            </Form.Item>
            <div className={style.button}>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={false}>
                  뒤로가기
                </Button>
              </Form.Item>
            </div>
          </div>
          <div className={style.horizontal}>
            <Form.Item label="등록일" style={{ width: 500 }}>
              <Input value={epiData.createDate} />
            </Form.Item>
            <Form.Item label="수정일" style={{ width: 500 }}>
              <Input value={epiData.updateDate} />
            </Form.Item>
          </div>
          <div className={style.horizontal}>
            <Form.Item label="회차상태" style={{ width: 500 }}>
              <Input value={epiData.status} />
            </Form.Item>
            <Form.Item label="무료/유료" style={{ width: 500 }}>
              <Input value={epiData.free} />
            </Form.Item>
          </div>
          <div className={style.normal}>
            <Form.Item label="컨텐츠 (소설내용)" style={{ width: 1800 }}>
              <TextArea rows={14} value={epiData.content} />
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
}
