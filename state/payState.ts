import { paymentType } from "@/types/user/paymentType";
import { atom } from "recoil";

export const payState = atom<number>({
    key: 'payState',
    default: 0
})