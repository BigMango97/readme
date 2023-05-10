export interface specificnovelSearchType {
  novelId: number;
  title: string;
  description: string;
  author: string;
  genre: string;
  grade: number;
  thumbnail: string;
  startDate: Date;
  serializationDays: number;
  views: number;
  serializationStatus: string;
  tag: tagType[];
  scheduleld: string;
  starRating: number;
}
export interface tagType {
  id: number;
  name: string;
}

export interface novelCardType {
  novelId: number;
  title: string;
  description: string;
  author: string;
  genre: string;
  grade: number;
  thumbnail: string;
  startDate: Date;
  serializationDays: number;
  views: number;
  serializationStatus: string;
  tag: tagType[];
  scheduleld: string;
  starRating: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  isNew: boolean;
  episodeCount: number;
}
