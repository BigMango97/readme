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
import style from "@/components/pages/admin/EpisodeForm.module.css";
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
  const epiData = {
    title: "",
    content: "",
    registration: dayjs(),
    free: "",
    status: "",
  };
  let buttonTxt = "등록";
  if (props.id >= 0) {
    //useEffect axios.get
    //
    buttonTxt = "수정";
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
                <Button type="primary" htmlType="submit">
                  {buttonTxt}
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
