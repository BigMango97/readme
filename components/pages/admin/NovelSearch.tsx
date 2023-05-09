import React from "react";
import { Input, Space } from "antd";
const { Search } = Input;
const onSearch = (value: string) => console.log(value);

const NovelSearch: React.FC = () => (
  <Space
    direction="vertical"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "2rem",
    }}
  >
    <Search
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      style={{ width: 1000 }}
    />
  </Space>
);

export default NovelSearch;
