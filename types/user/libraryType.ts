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

export interface recentReadType{
    id: number,
    uuid: string,
    novelId: number,
    episodeId: number,
    createDate: Dayjs
}

// export interface libraryDataType {
//     novelId: number,
//     title: string,
//     description: string,
//     author: string,
//     genre: string,
//     grade: number,
//     thumbnail: string,
//     startDate: string,
//     views: number,
//     serializationStatus: string,
//     tags: [allDetailTag],
//     scheduleId: number,
//     starRating: number,
//     serializationDays: string,
//     newChecking: boolean,
//     episodeCount: number,
//     authorComment: string,
//     episodeId:number,
//   }