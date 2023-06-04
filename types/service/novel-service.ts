export interface besteventIdDataType {
  data: {
    id: number;
    mainImage: string;
  };
}

//뷰어페이지 타입
export interface episodeDetailFetchType {
  data: {
    content: string;
    id: number;
    novelId: number;
    novelsTitle: string;
    registration: string;
    title: string;
  };
}
export interface ViewerPositionData {
    readAt: number | null;
    episodeId: number;
  }
  