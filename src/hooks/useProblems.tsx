import { useState, useEffect, useCallback } from "react";
import {
  fetchProblemDiff,
  fetchProblemData,
  fetchUserSubmission,
} from "../main/api";
import type { ProblemType, SubmissonWithoutAllType } from "../types/base";
import type { FetchUserSubmissionType } from "../types/apis";
import getContestInfo from "./../logic/getContestInfo";

const useProblems = () => {
  const [problems, setProblems] = useState<ProblemType[]>([]);

  // ローカルストレージから問題データを取り出す
  useEffect(() => {
    if (localStorage.array) {
      const saveDate = JSON.parse(localStorage.array);
      setProblems(saveDate);
      // リロードで回答状況を更新できる機能は要検討
    }
  }, [setProblems]);

  // 問題が追加または更新されたらローカルストレージに問題データを追加する
  useEffect(() => {
    localStorage.setItem("array", JSON.stringify(problems));
  }, [problems]);

  const addProblem = useCallback(
    async (userName: string, url: string) => {
      // URLじゃなかったら例外を投げる
      try {
        const problemUrl = new URL(url.trim());
        const { contest, problemId } = getContestInfo(problemUrl);

        let submission: SubmissonWithoutAllType = "nosub";
        const userNameCopy = userName === "" ? "no user" : userName.trim();
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
          url: problemUrl.href,
          diff: Math.max(problemDiff, 0),
          problem_id: problemId,
          contest: contest,
          sub: submission,
          user: userNameCopy,
        };
        setProblems([problemObj, ...problems]);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
          alert(e.message);
        }
      }
    },
    [problems],
  );

  const deleteProblem = useCallback(
    (key: number) => {
      const problemsCopy = [...problems];
      problemsCopy.splice(key, 1);
      setProblems(problemsCopy);
    },
    [problems],
  );

  // 回答状況だけを更新する
  // apiからsubだけを更新する
  const reLoad = async () => {
    const submissionPromises = new Array<
      Promise<FetchUserSubmissionType | undefined>
    >();

    try {
      // 過剰リクエストを防ぐための処置
      const waitSec = 45;
      const nowDate = Date.now();
      const LatestDate = localStorage.getItem("LatestReloadDate");
      if (LatestDate !== null) {
        const diffTime = Math.floor((nowDate - Number(LatestDate)) / 1000);
        if (diffTime <= waitSec) {
          alert(`あと${String(waitSec - diffTime)}秒待ってください`);
          return;
        }
      }
      localStorage.setItem("LatestReloadDate", String(nowDate));

      for (const problem of problems) {
        if (problem.sub === "AC") continue; // ACだったら更新する必要なし
        submissionPromises.push(
          fetchUserSubmission(problem.user, problem.problem_id),
        );
      }

      const problemsCopy = [...problems];
      const fetchedSubmissions = await Promise.all(submissionPromises);

      // 更新
      let isProblemSubmissionChanged = false;
      for (const fetchedSubmission of fetchedSubmissions) {
        if (!fetchedSubmission) continue;
        for (const problem of problemsCopy) {
          if (fetchedSubmission.problem_id !== problem.problem_id) continue;
          if (fetchedSubmission.result === problem.sub) continue;
          problem.sub = fetchedSubmission.result;
          isProblemSubmissionChanged = true;
        }
      }

      if (isProblemSubmissionChanged) {
        setProblems(problemsCopy);
        alert("回答状況更新しました");
      } else {
        alert("回答状況がまだ変更されていません");
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        alert(e.message);
      }
    }
  };

  return { problems, setProblems, addProblem, deleteProblem, reLoad };
};

export default useProblems;
