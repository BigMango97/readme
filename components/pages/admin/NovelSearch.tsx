import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = (value: string) => console.log(value);

const NovelSearch: React.FC = () => (
  <Space direction="vertical" style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'2rem'}}>
    <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 1000}} />
  </Space>
);

export default NovelSearch;