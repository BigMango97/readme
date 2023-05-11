import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { inputNovelType } from "@/types/admin/novelType";
import axios from "axios";
export default function NovelUpload(props: {
  //imageUrl: string;
  inputData: inputNovelType;
  setInputData: React.Dispatch<React.SetStateAction<inputNovelType>>;
}) {
  const getBase64 = async (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);

    const formData = new FormData();
    formData.append("multipartFile", img);
    try {
      //
      const imageRes = await axios.post(
        `http://43.200.189.164:8000/novels-service/s3/file`,
        formData,
        {
          // 헤더에 보낼 파일의 타입이 multipart라 말해줘야 한다. 이미지 파일은 크기 때문에 부분으로 나눠서 보내기 때문
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // 반환받은 이미지 URL, 원하는 곳에 사용하면 된다. 나 같은 경우 회원가입 할 때, 회원정보와 같이 한 번에 서버로 보내줬다.
      const image_URL = imageRes.data;
      console.log(`imageRes = `, imageRes.data);
      props.setInputData({
        ...props.inputData,
        thumbnail: image_URL,
      });
    } catch {}
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const [loading, setLoading] = useState(false);
  //const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        name="thumbnail"
        listType="picture-card"
        className="thumbnail-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {props.inputData.thumbnail ? (
          <img
            src={props.inputData.thumbnail}
            alt="thumbnail"
            style={{ width: "100%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
}
