/**
 * Copy clipboard
 * @param text
 */
export const copyClipboard = async (text: string): Promise<void> => {
  try {
    if (typeof window !== "undefined") {
      await navigator.clipboard.writeText(text);
    }
  } catch (e) {
    console.error((e as Error).message);
  }
};
