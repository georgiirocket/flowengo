import { format } from "date-fns";

export enum PatternData {
  date = "dd-MM-yyyy",
  dateWithTime = "dd-MM-yyyy HH:mm",
  onlyTime = "HH:mm",
  dayMonth = "dd-MM",
  monthWithYear = "MM/yyyy",
}

/**
 * Format date from ISO
 */
export const formatDateFromIso = (
  date: string | undefined | null,
  pattern: keyof typeof PatternData,
): string => {
  if (typeof date !== "string" || !date.length) {
    return "";
  }

  return format(date, PatternData[pattern]);
};
