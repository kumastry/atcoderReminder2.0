import Card from "./card";
import type { ProblemSetPropsType } from "./../types/props";
import { memo } from "react";
import { filterByColor, filterByDiff } from "./../logic/filterCard";

const ProblemSet = memo(
  ({
    problems,
    deleteProblem,
    diffFilter,
    subFilter,
  }: ProblemSetPropsType): React.JSX.Element => {
    // フィルターが増えることを考慮してリファクタリングすべき
    const filteredProblems = problems
      .filter((element) => filterByColor(element, diffFilter))
      .filter((element) => filterByDiff(element, subFilter));

    console.log("problem");
    return (
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
    );
  },
);

export default ProblemSet;
