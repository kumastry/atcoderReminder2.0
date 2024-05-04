import type {
  ProblemType,
  DifficultyType,
  AddProblemType,
  DeleteProblemType,
  SubmissionDropdownType,
} from "./base";

export type CardDetailType = Omit<ProblemType, "problem_id">;

export type CardPropsType = {
  cardDetail: CardDetailType;
  deleteProblem: DeleteProblemType;
  id: number;
};

export type FormPropsType = {
  userName: string;
  addProblem: AddProblemType;
  setSubFilter: React.Dispatch<React.SetStateAction<SubmissionDropdownType>>;
  setDiffFilter: React.Dispatch<React.SetStateAction<DifficultyType>>;
  reLoad: () => void;
};

export type ProblemSetPropsType = {
  problems: ProblemType[];
  deleteProblem: DeleteProblemType;
  subFilter: SubmissionDropdownType;
  diffFilter: DifficultyType;
};
