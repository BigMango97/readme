import { Dayjs } from "dayjs";

export interface paymentType {
    tid:string, 
    partnerOrderId:string
  }
export interface pointPayType {
  amount: number;
  point: number;
  purchaseDate: string;
}