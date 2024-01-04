import { useEffect, useState } from "react";
import Form from "./form";
import ProblemSet from "./problemset";
import type {
  SubmissionType,
  DifficultyType,
  ProblemType,
} from "./../types/base";

function Main(): React.JSX.Element {
  const [userName, setUserName] = useState<string>("");
  const [problems, setProblems] = useState<ProblemType[]>([]);
  const [subFilter, setSubFilter] = useState<SubmissionType>("all");
  const [diffFilter, setDiffFilter] = useState<DifficultyType>("all");

  // ローカルストレージからユーザー名を取得する
  useEffect(() => {
    if (localStorage.user) {
      const userName_localst = JSON.parse(localStorage.user);
      setUserName(userName_localst);
    }
  }, []);

  // ユーザー名が入力されたらローカルストレージに保存する
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userName));
  }, [userName]);

  console.log("main");
  return (
    <div>
      {/* ユーザーネーム入力欄 */}
      <nav className="navbar" role="navigation" aria-label="main nabigation">
        <div className="navbar-brand">
          <input
            className="navbar-item"
            id="userform"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
          ></input>
        </div>
      </nav>

      {/*URLフォーム*/}
      <Form
        userName={userName}
        problems={problems}
        setProblems={setProblems}
        setSubFilter={setSubFilter}
        setDiffFilter={setDiffFilter}
      />

      {/* 問題リスト */}
      <section className="section">
        <ProblemSet
          problems={problems}
          setProblems={setProblems}
          diffFilter={diffFilter}
          subFilter={subFilter}
        />
      </section>
    </div>
  );
}

export default Main;
