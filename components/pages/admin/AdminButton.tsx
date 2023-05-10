import React from "react";
import { Button, Space } from "antd";

interface Props {
  title: string;
  onClick: () => void;
}
export default function AdminButton({ title, onClick }: Props) {
  return (
    <Space wrap>
      <Button type="primary" onClick={onClick}>{title}</Button>
    </Space>
  );
}
