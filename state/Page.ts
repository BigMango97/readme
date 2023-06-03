import { atom } from "recoil";

export const pageState = atom({
  key: "pageState",
  default: 1,
});

export const totalPagesState = atom({
  key: "totalPagesState",
  default: 1,
});
