import { Dayjs } from "dayjs";

export interface likeType{
    id: string;
    novelsId: string;
    createDate: Dayjs;
}
export interface likeListType{
    likeList : likeType[]
}
