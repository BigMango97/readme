import { Dayjs } from "dayjs";

export interface cardListType{
    cardList : cardType[];
}

export interface cardType{
    scheduleId : number;
    scheduleName : string;
    startDate : Dayjs;
    endDate: Dayjs;
    novelCardsList: novelType[];
}

// export interface novelListType{
//     novelList : novelType[];
// }

export interface novelType{
    novelId: number;
    novelTitle: string;
}

export interface cardTableType{
    key : number;
    scheduleId : number;
    scheduleName : string;
    startDate : Dayjs;
    endDate: Dayjs;
    novelIds: string,
    novelNames: string,
}

export interface cardColumnsType{
    scheduleId : number;
    scheduleName : string;
    startDate : Dayjs;
    endDate: Dayjs;
    novelIds: string,
    novelNames: string,
}

export interface cardEditType{
    scheduleId : number;
    scheduleName : string;
    novelCardsList: novelType[];
}







