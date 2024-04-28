export const fetchJson = async <T>(url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Network response was not OK");
  }

  const jsonData: T = await res.json();

  return jsonData;
};

export const fetchPartialUserSubmissions = async <T>(
  userName: string,
  fromSecond: number,
): Promise<T> => {
  // https://github.com/kenkoooo/AtCoderProblems/blob/37e64781e37e7b0332cc8fe54e99d38ff0229d3e/atcoder-problems-frontend/src/utils/Api.tsx#L9
  // 上のURLを参照
  const res = await fetch(
    `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${userName}&from_second=${fromSecond}`,
  );

  if (!res.ok) {
    throw new Error("Network response was not OK");
  }

  const submissionData: T = await res.json();
  return submissionData;
};
