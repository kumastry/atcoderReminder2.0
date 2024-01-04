export type SubmissionType = "all" | "AC" | "WA" | "TLE" | "MLE" | "CE" | "nosub";

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

export type ProblemType = {
  title: string;
  url: string;
  diff: number;
  problem_id: string;
  contest: string;
  sub: Exclude<SubmissionType, "all">;
  user: string;
  version: number;
};
