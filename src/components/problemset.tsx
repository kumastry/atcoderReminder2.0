import Card from "./card";
import type { ProblemSetPropsType } from "./../types/props";
import { memo } from "react";

const ProblemSet = memo(
  ({
    problems,
    deleteProblem,
    diffFilter,
    subFilter,
  }: ProblemSetPropsType): React.JSX.Element => {
    const filteredBycolororProblems = problems.filter((element) => {
      let color = "all";
      if (element.diff < 400) {
        color = "gray";
      } else if (element.diff < 800) {
        color = "brawn";
      } else if (element.diff < 1200) {
        color = "green";
      } else if (element.diff < 1600) {
        color = "cyan";
      } else if (element.diff < 2000) {
        color = "blue";
      } else if (element.diff < 2400) {
        color = "yellow";
      } else if (element.diff < 2800) {
        color = "orange";
      } else {
        color = "red";
      }

      if (diffFilter === "all") {
        return true;
      }
      return diffFilter === color;
    });

    const filteredProblems = filteredBycolororProblems.filter((element) => {
      let sub = "all";
      if (element.sub === "AC") {
        sub = "AC";
      } else if (element.sub === "WA") {
        sub = "WA";
      } else if (element.sub === "nosub") {
        sub = "nosub";
      }

      if (subFilter === "all") {
        return true;
      }
      return subFilter === sub;
    });
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
