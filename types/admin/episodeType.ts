import { Dayjs } from "dayjs";

export interface episodeType{
    id : number;
    title : string;
    content : string;
    registration : Dayjs;
    createDate : Dayjs;
    updateDate : Dayjs;
    free : boolean;
    status : string;

}
export interface episodeInputType{
    id : number;
    title : string;
    //content : string;
    registration : Dayjs;
    createDate : Dayjs;
    updateDate : Dayjs;
    free : boolean;
    status : string;
}

export interface episodeListType{
    episodeList:episodeType[]
}