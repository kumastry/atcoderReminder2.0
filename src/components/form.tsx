import { useEffect, useState } from "react";
import {
  fetchProblemDiff,
  fetchProblemData,
  fetchUserSubmission,
} from "../main/api";
import type { FormPropsType } from "./../types/props";
// import type { FetchProblemType } from "./../types/apis";

import type {
  ProblemType,
  SubmissionType,
  DifficultyType,
} from "./../types/base";

function Form({
  userName,
  problems,
  setProblems,
  setSubFilter,
  setDiffFilter,
}: FormPropsType) {
  const [problemUrl, setProblemUrl] = useState("");

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

  async function addProblem() {
    const splitUrl = problemUrl.split("/");
    const problemId = splitUrl[splitUrl.length - 1];
    const contest = splitUrl[splitUrl.length - 3];
    let submission: Exclude<SubmissionType, "all"> = "nosub";
    const userNameCopy = userName === "" ? "no user" : userName;

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
      setProblemUrl("");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        alert(e.message);
      }
    }
  }

  // 実装中
  const reLoad = () => {
    // console.log(problems);
    // let userNames = [];
    // problems.map((t) => {
    //   userNames.push(t.user);
    // });

    // userNames = [...new Set(userNames)];
    // const tmp = [...problems];

    // userNames.map((t1) => {
    //   fetchUserSubmission(t1).then((data) => {
    //     tmp.map((t2) => {
    //       data.map((t3) => {
    //         if (t2.problem_id === t3.problem_id) {
    //           t2.sub = t3.result;
    //           t2.version++;
    //         }
    //       });
    //     });
    //   });
    // });

    // setProblems(tmp);
    // console.log(problems);
    alert("実装中の機能です");
  };

  console.log("form");
  return (
    <div>
      <main>
        <section className="section">
          <button className="button" onClick={reLoad} style={{ float: "left" }}>
            <span>Reload</span>
          </button>

          <input
            className="input"
            type="text"
            placeholder="Problem URL"
            value={problemUrl}
            onChange={(e) => setProblemUrl(e.target.value)}
            onKeyPress={(e) => {
              e.key == "Enter" ? addProblem() : "";
            }}
          />

          <button
            className="button is-fullwidth is-success is-light"
            onClick={addProblem}
          >
            Add Problem
          </button>

          <div className="select is-success is-active ">
            <select
              onChange={(e) =>
                setSubFilter(
                  e.target.value as Exclude<SubmissionType, "TLE" | "MLE">,
                )
              }
            >
              <option value="all">submission-All</option>
              <option value="AC">AC</option>
              <option value="WA">WA</option>
              <option value="nosub">Nosub</option>
            </select>
          </div>

          <div className="select is-success is-active">
            <select
              onChange={(e) => setDiffFilter(e.target.value as DifficultyType)}
            >
              <option value="all">diffculity-All</option>
              <option value="gray">0-400(gray)</option>
              <option value="brawn">400-800(brawn)</option>
              <option value="green">800-1200(green)</option>
              <option value="cyan">1200-1600(cyan)</option>
              <option value="blue">1600-2000(blue)</option>
              <option value="yellow">2000-2400(yellow)</option>
              <option value="orange">2400-2800(orange)</option>
              <option value="red">2800-∞(red)</option>
            </select>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Form;
