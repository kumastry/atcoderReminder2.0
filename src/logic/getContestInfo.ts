const getContestInfo = (url: URL) => {
  if (url.hostname !== "atcoder.jp") {
    throw new Error("Invalid URL");
  }
  const splitUrl = url.pathname.split("/");
  const problemId = splitUrl.at(-1);
  const contest = splitUrl.at(-3);
  if (!problemId || !contest) {
    throw new Error("Invalid URL");
  }

  return { contest, problemId };
};

export default getContestInfo;
