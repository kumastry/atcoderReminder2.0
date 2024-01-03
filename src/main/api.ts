import type {
  FetchProblemType,
  DifficultyType,
  FetchUserSubmissionType,
} from "./../types/apis";

export async function fetchPromInfo(): Promise<FetchProblemType[]> {
  const res = await fetch(
    `https://kenkoooo.com/atcoder/resources/problems.json`,
  );

  return await res.json();
}

export async function fetchPromDiff(): Promise<DifficultyType> {
  const res = await fetch(
    `https://kenkoooo.com/atcoder/resources/problem-models.json`,
  );

  return await res.json();
}

export async function fetchUesrsSub(
  userName: string,
): Promise<FetchUserSubmissionType[]> {
  const res = await fetch(
    `https://kenkoooo.com/atcoder/atcoder-api/results?user=${userName}`,
  );
  return await res.json();
}
