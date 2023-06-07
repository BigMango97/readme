import { episodeInputType } from "@/types/admin/episodeType";
import { Dispatch, SetStateAction, useMemo, useRef } from "react";
//import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// props 타입정의
type QuillEditorProps = {
  inputData: episodeInputType;
  setInputData: Dispatch<SetStateAction<episodeInputType>>;
};

import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const EpisodeEditor = ({ inputData, setInputData }: QuillEditorProps) => {
  const quillRef = useRef(null);
  const modules = useMemo(
    () => ({
      toolbar: {
        // 툴바에 넣을 기능
        container: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image"],
          ["clean"],
        ],
      },
      clipboard: {
        // Quill의 기본 행동을 재정의
        matchVisual: false,
      },
    }),
    []
  );

  return (
    <>
      <ReactQuill
        //ref={quillRef}
        value={inputData.content}
        onChange={(e) =>
          setInputData({
            ...inputData,
            content: e,
          })
        }
        modules={modules}
        placeholder={"내용을 입력해주세요."}
        theme="snow"
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "size",
          "color",
          "list",
          "bullet",
          "indent",
          "align",
          "image",
          "clean",
        ]}
        style={{
          height: "300px",
          marginBottom: "5rem",
          backgroundColor: "#FCFCFC",
        }} // style
      />
    </>
  );
};

export default EpisodeEditor;
