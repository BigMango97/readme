export interface eventDataType {
  id: number;
  name: string;
}
export interface eventCardListType {
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
  tags: eventtagType[];
  scheduleId: number;
  starRating: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface eventtagType {
  id: number;
  name: string;
}
