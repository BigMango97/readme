export interface novelRankingResultType {
  viewsDate: string;
  novelRankingData: novelRankingDataType[];
}

export interface novelRankingDataType {
  data: {
    novelId: number;
    title: string;
    author: string;
    genre: string;
    grade: number;
    serializationStatus: string;
    thumbnail: string;
    ranking: number;
    changeRanking: number;
  };
}
