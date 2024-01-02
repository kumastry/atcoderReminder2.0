export type SubmissionType = "all" | "AC" | "WA" | "nosub";

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
  problem_id: number;
  contest: string;
  sub: Exclude<SubmissionType, "all">;
  user: string;
  version: number;
};
