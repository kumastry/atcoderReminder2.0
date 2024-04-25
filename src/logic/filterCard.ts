import type {
  SubmissionType,
  DifficultyType,
  SubmissonWithoutAllType,
} from "../types/base";

export const filterByColor = (diff: number, diffFilter: DifficultyType) => {
  let color = "all";
  if (diff < 400) {
    color = "gray";
  } else if (diff < 800) {
    color = "brown";
  } else if (diff < 1200) {
    color = "green";
  } else if (diff < 1600) {
    color = "cyan";
  } else if (diff < 2000) {
    color = "blue";
  } else if (diff < 2400) {
    color = "yellow";
  } else if (diff < 2800) {
    color = "orange";
  } else {
    color = "red";
  }

  if (diffFilter === "all") {
    return true;
  }
  return diffFilter === color;
};

export const filterBySub = (
  probSub: SubmissonWithoutAllType,
  subFilter: SubmissionType,
) => {
  let sub = "all";
  if (probSub === "AC") {
    sub = "AC";
  } else if (probSub === "nosub") {
    sub = "nosub";
  } else {
    sub = "WA";
  }

  if (subFilter === "all") {
    return true;
  }
  return subFilter === sub;
};
