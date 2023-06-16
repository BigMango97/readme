import { atom } from 'recoil'

export const recentSearchWord = atom<string[]>({
    key: 'recentSearchWord',
    default: [] as string[],
})