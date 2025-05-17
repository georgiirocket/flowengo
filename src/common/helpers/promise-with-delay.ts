import { differenceInMilliseconds } from "date-fns";

export const promiseWithDelay = async <T>(
  fn: () => Promise<T>,
  timeMs: number,
): Promise<T> => {
  const timeStart = new Date();

  const result = await fn();

  const ms = differenceInMilliseconds(new Date(), timeStart);

  if (ms >= timeMs) {
    return new Promise((resolve) => {
      resolve(result);
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, timeMs - ms);
  });
};
