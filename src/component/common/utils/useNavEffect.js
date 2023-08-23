import { useCallback } from "react";
import { h0 } from "./fp";

export const useNavEffect = (departDate, dispatch, prevDate, nextDate) => {
  const isPrevDisabled = h0(departDate) <= h0(); // 小於現在的不行買
  const isNextDisabled = h0(departDate) - h0() > 20 * 86400 * 1000; // 大於20天的日期不可買

  const prev = useCallback(() => {
    if (isPrevDisabled) return
    dispatch(prevDate());
  }, [isPrevDisabled, dispatch, prevDate]);

  const next = useCallback(() => {
    if (isNextDisabled) return
    dispatch(nextDate());
  }, [isNextDisabled, dispatch, nextDate]);

  return {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next,
  };
}