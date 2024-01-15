import type {
  FetchProblemType,
  DifficultyType,
  FetchUserSubmissionType,
} from "./../types/apis";

export async function fetchProblemData(
  problem_Id: string,
): Promise<FetchProblemType | undefined> {
  const res = await fetch(
    `https://kenkoooo.com/atcoder/resources/problems.json`,
  );

  if (!res.ok) {
    throw new Error("Network response was not OK");
  }

  const problems: FetchProblemType[] = await res.json();

  const filteredProblems = problems.filter((item: FetchProblemType) => {
    return item.id === problem_Id;
  });

  if (filteredProblems.length) {
    const filteredProblem = filteredProblems[0];
    return filteredProblem;
  }

  return undefined;
}

export async function fetchProblemDiff(problem_Id: string): Promise<number> {
  const res = await fetch(
    `https://kenkoooo.com/atcoder/resources/problem-models.json`,
  );

  if (!res.ok) {
    throw new Error("Network response was not OK");
  }

  const problemsDiff: DifficultyType = await res.json();

  if (problemsDiff[problem_Id]) {
    return problemsDiff[problem_Id]["difficulty"];
  }

  return 0;
}

export async function fetchUserSubmission(
  userName: string,
  problem_Id: string,
): Promise<FetchUserSubmissionType | undefined> {
  const fromSecond = 1577887218; // 暫定数値
  const res = await fetch(
    `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${userName}&from_second=${fromSecond}`,
  );

  if (!res.ok) {
    throw new Error("Network response was not OK");
  }

  const userSubmissions: FetchUserSubmissionType[] = await res.json();

  const filteredUserSubmissions = userSubmissions.filter((item) => {
    return item.user_id === userName && item.problem_id === problem_Id;
  });

  if (!filteredUserSubmissions.length) return undefined;

  // 一つの問題に対して複数の提出がある
  // 優先順位：AC > WA > TLE,MLE,CE
  const priorityResults = ["AC", "WA", "TLE", "MLE", "CE"];
  for (const result of priorityResults) {
    for (const item of filteredUserSubmissions) {
      if (result === item.result) return item;
    }
  }
}
