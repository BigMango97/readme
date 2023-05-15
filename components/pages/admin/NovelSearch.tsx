import React from "react";
import { Input, Space } from "antd";
import { useRouter } from "next/router";
const { Search } = Input;

export default function NovelSearch() {
  const router = useRouter();
  const onSearch = (value: string) => {
    const type = router.query.type;
    console.log("router.query =", type);
    //소설검색
    if (type === "1" || type === undefined) {
      router.push(`/admin/main?type=1&search=${value}`);
    }
  };

  return (
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
}
