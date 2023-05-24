import { Dayjs } from "dayjs";

export interface episodeType{
    id : number;
    novelId : number;
    title : string;
    content : string;
    registration : Dayjs;
    createDate : Dayjs;
    updateDate : Dayjs;
    free : boolean;
    status : string;
}
export interface episodeInputType{
    title : string;
    content : string;
    registration : Dayjs;
    createDate : Dayjs;
    updateDate : Dayjs;
    free : boolean;
    status : string;
}

export interface episodeListType{
    episodeList:episodeType[]
}

export interface episodeTableType{
    key : number;
    id : number;
    novelId : number;
    title : string;
    content : string;
    registration : Dayjs;
    createDate : Dayjs;
    updateDate : Dayjs;
    free : boolean;
    status : string;

}