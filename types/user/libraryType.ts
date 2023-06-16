import dayjs, { Dayjs } from "dayjs";
import { allDetailTag } from "../model/mainDataType";

export interface likeType{
    id: string;
    novelsId: string;
    createDate: Dayjs;
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

export interface recentReadType {
    id: number;
    uuid: string;
    novelId: number;
    episodeId: number;
    createDate: Dayjs;
    readAt: number;
}

export interface purchasedNovelType {
    novelId: number,
    novelTitle: string,
    episodeTitle : string,
    purchasedDate: number[],
  }


  