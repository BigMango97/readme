export interface mainBestItemsType {
  id: number;
  title: string;
  author: string;
  status: string;
  categoryName: string;
  isAudio: boolean;
  thumbnailUrl: string;
  viewCount: number;
  rate: number;
  contentsCount: number;
  link: string;
}

export interface mainBestItemsDescriptionType {
  id: number;
  title: string;
  tags: tagType[];
}

export interface tagType {
  id: number;
  name: string;
}