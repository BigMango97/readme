import React, { useState } from "react";
import { Input, Select, Space } from "antd";
import { useRouter } from "next/router";
const { Search } = Input;

export default function NovelSearch() {
  const router = useRouter();
  const [select, setSelect] = useState<string>("title");
  const onSearch = (value: string) => {
    const type = router.query.type;
    //소설검색 수정하기
    if (type === "1" || type === undefined) {
      router.push(`/admin/main?type=1&search=${value}&select=${select}`);
    }
  };

  const handleChange = (value: string) => {
    setSelect(value);
  };

  return (
    <Space
      direction="horizontal"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem",
      }}
    >
      <Select
        defaultValue="title"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: "title", label: "제목" },
          { value: "author", label: "작가" },
        ]}
      />
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{ width: 1000 }}
      />
    </Space>
  );
}
