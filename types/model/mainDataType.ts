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

export interface cardType {
  novelId: number;
  title: string;
  description: string;
  author: string;
  genre: string;
  grade: number;
  thumbnail: string;
  serializationStatus: string;
  starRating: number;
  episodeCount: number;
  newChecking: boolean;
}

export interface allNovelCardType {
  novelCardsData: [cardType];
  totalElements: number;
  totalPages: number;
}

export interface allDetailDatatype {
  novelId: number;
  title: string;
  description: string;
  author: string;
  genre: string;
  grade: number;
  thumbnail: string;
  startDate: string;
  views: number;
  serializationStatus: string;
  tags: [allDetailTag];
  scheduleId: number;
  starRating: number;
  serializationDays: string;
  newChecking: boolean;
  episodeCount: number;
  authorComment: string;
  episodeId:number;
  recentId:number;
}

export interface allDetailTag {
  id: number;
  name: string;
}

export interface episodesAllDatatype {
  novelId: number;
  episodes: [episodeCardDataType];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface episodeCardDataType {
  id: number;
  name: string;
  free: boolean;
  registrationDate: string;
  starRating: number;
  isNew: boolean;
}

export interface viewerData {
  id:number;
  novelId:number;
  novelsTitle:string;
  title:string;
  content:string;
  registration:string;
}

