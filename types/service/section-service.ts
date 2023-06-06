export interface scheduleQueryType {
  id: number; name: string; startDate: string; endDate: string ;
}

export interface besteventNovelQueryType {
  author: string;
  authorComment: string;
  description: string;
  episodeCount: number;
  genre: string;
  grade: number;
  newChecking: boolean;
  novelId: number;
  scheduleId: number;
  serializationDays: string;
  serializationStatus: string;
  starRating: number;
  startDate: string;
  tags: [name: string];
  thumbnail: string;
  title: string;
  views: number;
}
