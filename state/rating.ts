import { atom } from 'recoil';

export const shouldRefetchTotalRatingState = atom({
  key: 'shouldRefetchTotalRatingState',
  default: false,
});