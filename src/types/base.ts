export type SubmissionType =
  | "all"
  | "AC"
  | "WA"
  | "TLE"
  | "MLE"
  | "CE"
  | "nosub";

export type DifficultyType =
  | "all"
  | "gray"
  | "brown"
  | "green"
  | "cyan"
  | "blue"
  | "yellow"
  | "orange"
  | "red";

export type SubmissionDropdownType = Exclude<
  SubmissionType,
  "TLE" | "MLE" | "CE"
>;
export type SubmissonWithoutAllType = Exclude<SubmissionType, "all">;

export type ProblemType = {
  title: string;
  url: string;
  diff: number;
  problem_id: string;
  contest: string;
  sub: SubmissonWithoutAllType;
  user: string;
};

export type AddProblemType = (userName: string, problemUrl: string) => void;

export type DeleteProblemType = (key: number) => void;
