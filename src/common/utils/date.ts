import { isBefore, isEqual } from 'date-fns';

export const isBeforeOrEqual = (date: string): boolean => {
  const now = new Date();

  return isBefore(date, now) || isEqual(date, now);
};
