import { Dayjs } from "dayjs";

export interface tagType{
    id: number;
    name: string;
}

export interface inputNovelType{
    title: string;
    description: string;
    author: string;
    startDate: Dayjs;
    serializationDay: string[];
    serializationStatus: string;
    thumbnail: string;
    authorComment: string;
    grade: number;
    genre: string;
    tags: string[];
}

export interface novelType{
    id: number;
    title: string;
    description: string;
    author: string;
    startDate: Dayjs;
    serializationDay: string[];
    serializationStatus: string;
    thumbnail: string;
    authorComment: string;
    grade: number;
    genre: string;
    tags: string[];
}

export interface novelListType{
    novelList:novelType[]
}