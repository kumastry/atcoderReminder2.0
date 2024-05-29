import Card from "./card";
import type { ProblemSetPropsType } from "./../types/props";
import { memo } from "react";
import { filterByColor, filterBySub } from "./../logic/filterCard";
import useLayoutButtons from "./../hooks/useLayoutButtons";
import LayoutButtons from "./layoutButtons";

const ProblemSet = memo(
  ({
    problems,
    deleteProblem,
    diffFilter,
    subFilter,
  }: ProblemSetPropsType): React.JSX.Element => {
    // フィルターが増えることを考慮してリファクタリングすべき
    const filteredProblems = problems
      .filter((element) => filterByColor(element.diff, diffFilter))
      .filter((element) => filterBySub(element.sub, subFilter));

    const { layout, onClickLayoutHandler } = useLayoutButtons();

    console.log("problem");
    return (
      <section className="section problem_section">
        <LayoutButtons
          layout={layout}
          onClickLayoutHandler={onClickLayoutHandler}
        />

        {filteredProblems.length ? (
          <ul className={layout === "list" ? "problem_list" : "grid"}>
            {filteredProblems.map((element, key: number) => {
              return (
                <li
                  className={
                    layout === "list" ? "problem_list_element" : "cell"
                  }
                  key={key}
                >
                  <Card
                    cardDetail={element}
                    id={key}
                    deleteProblem={deleteProblem}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Problems not found</p>
        )}
      </section>
    );
  },
);

export default ProblemSet;
