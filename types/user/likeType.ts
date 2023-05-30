import { Dayjs } from "dayjs";

export interface likeType{
    id: string;
    novelsId: string;
    createDate: Dayjs;
}
export interface likeListType{
    likeList : likeType[]
}

export interface likeNovelType{
    id: number;
    title: string;
    author: string;
    description: string;
    startDate: Dayjs;
    serializationDay: string[];
    thumbnail: string;
    serializationStatus: string;
    authorComment: string;
    genre: string;
    grade: number;
    tags: string[];
}