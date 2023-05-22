export interface loginType{
    userId: string;
    accessToken: string;
    refreshToken: string;
    isLogin: boolean;
}
export interface userDataType{
    nickname: string;
    name: string;
    image: string;
    email: string;
    gender: string;
    birthday: string;
    birthYear: string;
    phoneNumber: string;
}