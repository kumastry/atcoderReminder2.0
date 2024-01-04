import { useEffect, useState } from "react";
import { fetchProblemDiff, fetchProblemData, fetchUserSubmission } from "../main/api";
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
    const tmp = [...problems];
    const urlsplit = problemUrl.split("/");
    const problem_Id_tmp = urlsplit[urlsplit.length - 1];
    const contest_tmp = urlsplit[urlsplit.length - 3];


    let diff_tmp = 0;
    let sub_tmp: Exclude<SubmissionType, "all"> = "nosub";
    const userName_tmp = userName === "" ? "no user" : userName;
    let Name_tmp;

    try {
      const promInfo = await fetchProblemData(problem_Id_tmp);
      Name_tmp = promInfo?.title;
      console.log(promInfo);
    } catch (e) {
      alert("エラーが発生しました");
    }

    if (Name_tmp) {
      diff_tmp =  await fetchProblemDiff(problem_Id_tmp);
      const usersSub = await fetchUserSubmission(userName_tmp, problem_Id_tmp);

      if(usersSub) {
        sub_tmp = usersSub.result;
      }

      const problemObj: ProblemType = {
        title: Name_tmp,
        url: problemUrl,
        diff: Math.max(diff_tmp, 0),
        problem_id: problem_Id_tmp,
        contest: contest_tmp,
        sub: sub_tmp,
        user: userName_tmp,
        version: 0,
      };

      console.log(problemObj);
      tmp.unshift(problemObj);
      console.log(tmp);
      setProblems(tmp);
    } else {
      alert("Problem Not Found");
    }

    setProblemUrl("");
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
