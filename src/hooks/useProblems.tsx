import { useState, useEffect } from "react";
import {
  fetchProblemDiff,
  fetchProblemData,
  fetchUserSubmission,
} from "../main/api";
import type { ProblemType, SubmissonWithoutAllType } from "../types/base";
const useProblems = () => {
  const [problems, setProblems] = useState<ProblemType[]>([]);

  // ローカルストレージから問題データを取り出す
  useEffect(() => {
    if (localStorage.array) {
      const saveDate = JSON.parse(localStorage.array);
      setProblems(saveDate);
    }
  }, [setProblems]);

  // 問題が追加されたらローカルストレージに問題データを追加する
  useEffect(() => {
    localStorage.setItem("array", JSON.stringify(problems));
  }, [problems]);

  async function addProblem(userName: string, problemUrl: string) {
    const splitUrl = problemUrl.split("/");
    const problemId = splitUrl[splitUrl.length - 1];
    const contest = splitUrl[splitUrl.length - 3];
    let submission: SubmissonWithoutAllType = "nosub";
    const userNameCopy = userName === "" ? "no user" : userName;
    console.log(splitUrl);

    try {
      const [problemData, problemDiff, userSubmission] = await Promise.all([
        fetchProblemData(problemId),
        fetchProblemDiff(problemId),
        fetchUserSubmission(userNameCopy, problemId),
      ]);

      const title = problemData?.title;
      if (typeof title === "undefined") {
        throw new Error("problem not found");
      }

      if (typeof userSubmission !== "undefined") {
        submission = userSubmission.result;
      }

      const problemObj: ProblemType = {
        title: title,
        url: problemUrl,
        diff: Math.max(problemDiff, 0),
        problem_id: problemId,
        contest: contest,
        sub: submission,
        user: userNameCopy,
        version: 0,
      };
      setProblems([problemObj, ...problems]);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        alert(e.message);
      }
    }
  }

  function deleteProblem(key: number) {
    const problemsCopy = [...problems];
    problemsCopy.splice(key, 1);
    setProblems(problemsCopy);
  }

  return { problems, setProblems, addProblem, deleteProblem };
};

export default useProblems;
