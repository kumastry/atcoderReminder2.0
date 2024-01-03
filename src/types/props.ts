import type { ProblemType, SubmissionType, DifficultyType } from "./base";

type CardDetailType = Omit<ProblemType, "version" | "problem_id">;

export type CardPropsType = {
  cardDetail: CardDetailType;
  deleteProblem: (key: number) => void;
  id: number;
};

export type FormPropsType = {
  userName: string;
  problems: ProblemType[];
  setProblems: React.Dispatch<React.SetStateAction<ProblemType[]>>;
  setSubFilter: React.Dispatch<React.SetStateAction<SubmissionType>>;
  setDiffFilter: React.Dispatch<React.SetStateAction<DifficultyType>>;
};

export type ProblemSetPropsType = {
  problems: ProblemType[];
  deleteProblem: (key: number) => void;
  subFilter: SubmissionType;
  diffFilter: DifficultyType;
};
