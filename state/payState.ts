import { paymentType } from "@/types/paymentType";
import { atom } from "recoil";

export const payState = atom<paymentType>({
    key: 'payState',
    default: {tid:"", partnerOrderId:""}
})