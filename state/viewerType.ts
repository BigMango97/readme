import { atom } from 'recoil';

export type ViewerType = 'card' | 'list';

export const viewerTypeState = atom<ViewerType>({
  key: 'viewerTypeState',
  default: 'card',
});