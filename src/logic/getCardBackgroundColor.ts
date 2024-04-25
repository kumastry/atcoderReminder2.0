import type { SubmissonWithoutAllType } from "./../types/base";

const getCardBackgroundColor = (
  submission: SubmissonWithoutAllType,
): string => {
  if (submission === "AC") return "#c8e4cc";

  if (submission === "nosub") return "#ffffff";

  return "#fcecbc";
};

export default getCardBackgroundColor;
