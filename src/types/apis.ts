import type { SubmissionType } from "./base";

export type FetchProblemType = {
  id: string;
  contest_id: string;
  problem_index: string;
  name: string;
  title: string;
};

type DifficultyItem = {
  slope: number;
  intercept: number;
  variance: number;
  difficulty: number;
  discrimination: number;
  irt_loglikelihood: number;
  irt_users: number;
  is_experimental: boolean;
};

export type DifficultyType = Record<string, DifficultyItem>;

export type FetchUserSubmissionType = {
  id: number;
  epoch_second: number;
  problem_id: string;
  contest_id: string;
  user_id: string;
  language: string;
  point: number;
  length: number;
  result: SubmissionType;
  execution_time: number;
};
