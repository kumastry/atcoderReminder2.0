import type {
  ProblemType,
  SubmissionType,
  DifficultyType,
  AddProblemType,
  DeleteProblemType,
} from "./base";

type CardDetailType = Omit<ProblemType, "version" | "problem_id">;

export type CardPropsType = {
  cardDetail: CardDetailType;
  deleteProblem: DeleteProblemType;
  id: number;
};

export type FormPropsType = {
  userName: string;
  addProblem: AddProblemType;
  setSubFilter: React.Dispatch<React.SetStateAction<SubmissionType>>;
  setDiffFilter: React.Dispatch<React.SetStateAction<DifficultyType>>;
};

export type ProblemSetPropsType = {
  problems: ProblemType[];
  deleteProblem: DeleteProblemType;
  subFilter: SubmissionType;
  diffFilter: DifficultyType;
};
