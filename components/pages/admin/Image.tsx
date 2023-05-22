import React from 'react';
import { Image } from 'antd';

const NovelImage: React.FC = () => (
  <Image
    width={200}
    height={200}
    alt={"썸네일"}
    src={`/assets/images/dummy/bestItem01.png`}
  />
);

export default NovelImage;