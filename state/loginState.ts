import { loginType, userDataType } from "@/types/user/loginType";
import { atom } from "recoil";

export const loginCheckState = atom<boolean>({
    key: 'loginCheckState',
    default: false
})
export const userDataState = atom<userDataType>({
    key: 'userDataState',
    default: {
        nickname: "",
        name: "",
        image: "",
        email: "",
        gender: "",
        birthday: "",
        birthYear: "",
        phoneNumber: "",}
})