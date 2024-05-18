import Card from "./card";
import type { ProblemSetPropsType } from "./../types/props";
import { memo } from "react";
import { filterByColor, filterBySub } from "./../logic/filterCard";

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

    console.log("problem");
    return (
      <section className="section">
        {filteredProblems.length ? (
          <ul className="is-vertical-center">
            {filteredProblems.map((element, key: number) => {
              return (
                <li key={key}>
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
