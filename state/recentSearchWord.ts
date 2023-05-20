import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage
})
export const recentSearchWord = atom<string[]>({
    key: 'recentSearchWord',
    default: [],
    effects_UNSTABLE: [persistAtom]
})