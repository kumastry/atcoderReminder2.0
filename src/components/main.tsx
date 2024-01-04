import { useState } from "react";
import Form from "./form";
import ProblemSet from "./problemset";
import useUserName from "./../hooks/useUserName";
import type {
  SubmissionType,
  DifficultyType,
  ProblemType,
} from "./../types/base";

function Main(): React.JSX.Element {
  const [problems, setProblems] = useState<ProblemType[]>([]);
  const [subFilter, setSubFilter] = useState<SubmissionType>("all");
  const [diffFilter, setDiffFilter] = useState<DifficultyType>("all");

  const { userName, setUserName } = useUserName();

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
