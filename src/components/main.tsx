import { useState } from "react";
import Form from "./form";
import ProblemSet from "./problemset";
import useUserName from "./../hooks/useUserName";
import useProblems from "./../hooks/useProblems";
import type { SubmissionDropdownType, DifficultyType } from "./../types/base";
import { AddButtonLoadingContext } from "./../contexts/loadingContext";

function Main(): React.JSX.Element {
  const [subFilter, setSubFilter] = useState<SubmissionDropdownType>("all");
  const [diffFilter, setDiffFilter] = useState<DifficultyType>("all");

  const { userName, setUserName } = useUserName();
  const { problems, addProblem, deleteProblem, reLoad, isAddButtonLoading } =
    useProblems();

  console.log("main");
  return (
    <main>
      {/* ユーザーネーム入力欄 */}
      {/* コンポーネントとして分割予定 */}
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
      <AddButtonLoadingContext.Provider value={isAddButtonLoading}>
        <Form
          userName={userName}
          addProblem={addProblem}
          setSubFilter={setSubFilter}
          setDiffFilter={setDiffFilter}
          reLoad={reLoad}
        />
      </AddButtonLoadingContext.Provider>

      {/* 問題リスト */}
      <ProblemSet
        problems={problems}
        deleteProblem={deleteProblem}
        diffFilter={diffFilter}
        subFilter={subFilter}
      />
    </main>
  );
}

export default Main;
