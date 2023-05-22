import { Dayjs } from "dayjs";

export interface scheduleType{
    id: number;
    name: string;
    startDate: Dayjs;
    endDate: Dayjs;
}

export interface scheduleListType{
    scheduleList : scheduleType[]
}

export interface scheduleTableType{
    key : number;
    id: number;
    name: string;
    startDate: Dayjs;
    endDate: Dayjs;
}