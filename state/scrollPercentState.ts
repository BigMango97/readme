import { atom, useRecoilState } from "recoil";
import { useCallback } from "react";

export const scrollPercentState = atom({
  key: "scrollPercentState",
  default: 0,
});

export const useScrollPercentState = () => {
  const [scrollPercent, setScrollPercent] = useRecoilState(scrollPercentState);

  const updateScrollPercent = useCallback(
    (percent: number) => {
      setScrollPercent(percent);
    },
    [setScrollPercent]
  );

  return [scrollPercent, updateScrollPercent];
};