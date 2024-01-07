import type {
  SubmissionType,
  DifficultyType,
  ProblemType,
} from "../types/base";

export const filterByColor = (
  element: ProblemType,
  diffFilter: DifficultyType,
) => {
  let color = "all";
  if (element.diff < 400) {
    color = "gray";
  } else if (element.diff < 800) {
    color = "brawn";
  } else if (element.diff < 1200) {
    color = "green";
  } else if (element.diff < 1600) {
    color = "cyan";
  } else if (element.diff < 2000) {
    color = "blue";
  } else if (element.diff < 2400) {
    color = "yellow";
  } else if (element.diff < 2800) {
    color = "orange";
  } else {
    color = "red";
  }

  if (diffFilter === "all") {
    return true;
  }
  return diffFilter === color;
};

export const filterByDiff = (
  element: ProblemType,
  subFilter: SubmissionType,
) => {
  let sub = "all";
  if (element.sub === "AC") {
    sub = "AC";
  } else if (element.sub === "nosub") {
    sub = "nosub";
  } else {
    sub = "WA";
  }

  if (subFilter === "all") {
    return true;
  }
  return subFilter === sub;
};
