import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Space, Input, Tag, Tooltip, theme, Form } from "antd";
import { inputNovelType, tagType } from "@/types/admin/novelType";

export default function AdminTag(props: {
  //tags: tagType[];
  inputData: inputNovelType;
  setInputData: React.Dispatch<React.SetStateAction<inputNovelType>>;
}) {
  const { token } = theme.useToken();
  //const [tags, setTags] = useState([""]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  //태그 삭제
  const handleClose = (removedTag: string) => {
    const newTags: tagType[] = props.inputData.tag.filter(
      (tag) => tag.name !== removedTag
    );
    console.log(newTags);
    props.setInputData({
      ...props.inputData,
      tag: newTags,
    });
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    const tagNames = props.inputData.tag.map((item) => item.name);

    if (
      inputValue &&
      tagNames.indexOf(inputValue) === -1 &&
      props.inputData.tag.length <= 2
    ) {
      const newItem: tagType = {
        id: props.inputData.tag.length,
        name: inputValue,
      };
      props.setInputData({
        ...props.inputData,
        tag: [...props.inputData.tag, newItem],
      });
    }

    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...props.inputData.tag];
    console.log(`newTags = ${newTags}`);

    newTags.map((item) => {
      if (item.id === editInputIndex) {
        item.name = editInputValue;
        props.setInputData({
          ...props.inputData,
          tag: newTags,
        });
        setEditInputIndex(-1);
        setInputValue("");
      }
    });
  };

  const tagInputStyle: React.CSSProperties = {
    width: 78,
    verticalAlign: "top",
  };

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <Space size={[0, 8]} wrap>
      <Space size={[0, 8]} wrap>
        {props.inputData.tag.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag.id}
                size="small"
                style={tagInputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }
          const isLongTag = tag.name.length > 20;
          const tagElem = (
            <Tag
              key={tag.id}
              closable={true}
              style={{ userSelect: "none" }}
              onClose={() => handleClose(tag.name)}
            >
              <span
                onDoubleClick={(e) => {
                  //if (index !== 0) {
                  console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
                  setEditInputIndex(index);
                  setEditInputValue(tag.name);
                  e.preventDefault();
                  //}
                }}
              >
                {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag.name} key={tag.id}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      </Space>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={tagPlusStyle} onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </Space>
  );
}
