import type {
  FetchProblemType,
  DifficultyType,
  FetchUserSubmissionType,
} from "./../types/apis";
import { fetchJson, fetchPartialUserSubmissions } from "./fetcher";

export async function fetchProblemData(
  problem_Id: string,
): Promise<FetchProblemType | undefined> {
  const problems = await fetchJson<FetchProblemType[]>(
    `https://kenkoooo.com/atcoder/resources/problems.json`,
  );

  // filteredProblemsには長さ1の配列が入る
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
  const problemsDiff = await fetchJson<DifficultyType>(
    `https://kenkoooo.com/atcoder/resources/problem-models.json`,
  );

  if (problemsDiff[problem_Id]) {
    return problemsDiff[problem_Id]["difficulty"];
  }

  return 0;
}

export async function fetchUserSubmission(
  userName: string,
  problem_Id: string,
): Promise<FetchUserSubmissionType | undefined> {
  // キャッシュ等でapiをたたく数を減らした方が良い
  const newFromSecond = Math.floor(Date.now() / 1000) - 2592000; //現在時刻から30日前
  const newSubmissions = await fetchUserSubmissionImpl(
    userName,
    problem_Id,
    newFromSecond,
  );
  if (newSubmissions) return newSubmissions;

  const oldFromSecond = 1582988400; // 俺がatcoder始めた時間
  const oldSubmissions = await fetchUserSubmissionImpl(
    userName,
    problem_Id,
    oldFromSecond,
  );
  if (oldSubmissions) return oldSubmissions;

  return undefined;
}

async function fetchUserSubmissionImpl(
  userName: string,
  problem_Id: string,
  fromSecond: number,
): Promise<FetchUserSubmissionType | undefined> {
  const allSubmissions = [] as FetchUserSubmissionType[];

  for (;;) {
    const userSubmissions: FetchUserSubmissionType[] =
      await fetchPartialUserSubmissions<FetchUserSubmissionType[]>(
        userName,
        fromSecond,
      );
    if (!userSubmissions.length) break;
    allSubmissions.push(...userSubmissions);
    allSubmissions.sort((a, b) => a.epoch_second - b.epoch_second);
    fromSecond = allSubmissions[allSubmissions.length - 1].epoch_second + 1;
    if (userSubmissions.length < 500) break;
  }

  const filteredUserSubmissions = allSubmissions.filter((item) => {
    return item.user_id === userName && item.problem_id === problem_Id;
  });

  if (!filteredUserSubmissions.length) return undefined;

  // 提出が新しい順から
  filteredUserSubmissions.reverse();

  // 一つの問題に対して複数の提出がある
  // 優先順位：AC > WA > TLE,MLE,CE
  const priorityResults = ["AC", "WA", "TLE", "MLE", "CE"];
  for (const result of priorityResults) {
    for (const item of filteredUserSubmissions) {
      if (result === item.result) return item;
    }
  }
}
