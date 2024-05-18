import { useState, useContext } from "react";
import type { FormPropsType } from "./../types/props";
import { AddButtonLoadingContext } from "./../contexts/loadingContext";

import type { SubmissionDropdownType, DifficultyType } from "./../types/base";

function Form({
  userName,
  addProblem,
  setSubFilter,
  setDiffFilter,
  reLoad,
}: FormPropsType) {
  const [problemUrl, setProblemUrl] = useState("");
  const isLoading = useContext(AddButtonLoadingContext);

  const addProblemWithForm = () => {
    addProblem(userName, problemUrl);
    setProblemUrl("");
  };

  console.log("form");
  return (
    <>
      <section className="section">
        {/* コンポーネント化 */}
        <button className="button" onClick={reLoad} style={{ float: "left" }}>
          <span>Reload</span>
        </button>

        {/* formタグで書き直す */}
        <input
          className="input"
          type="text"
          placeholder="Problem URL"
          value={problemUrl}
          onChange={(e) => setProblemUrl(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" && addProblemWithForm();
          }}
        />

        <button
          className={`button is-fullwidth is-success is-light ${
            isLoading && "is-loading"
          }`}
          onClick={addProblemWithForm}
        >
          Add Problem
        </button>


        {/* コンポーネント化 */}
        <div className="select is-success is-active ">
          <select
            onChange={(e) =>
              setSubFilter(e.target.value as SubmissionDropdownType)
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
            <option value="brown">400-800(brown)</option>
            <option value="green">800-1200(green)</option>
            <option value="cyan">1200-1600(cyan)</option>
            <option value="blue">1600-2000(blue)</option>
            <option value="yellow">2000-2400(yellow)</option>
            <option value="orange">2400-2800(orange)</option>
            <option value="red">2800-∞(red)</option>
          </select>
        </div>
      </section>
    </>
  );
}

export default Form;
