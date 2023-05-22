import { loginType } from "@/types/user/loginType";
import { atom } from "recoil";

export const loginCheckState = atom<boolean>({
    key: 'loginCheckState',
    default: false
})