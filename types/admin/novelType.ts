import { Dayjs } from "dayjs";
export interface novelInputType{
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

export interface novelTableType{
    key: number;
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

export interface novelIdType{
    novelId:number;
}
