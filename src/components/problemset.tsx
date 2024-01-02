import Card from "./card";
import type { ProblemSetPropsType } from "./../types/props";

function ProblemSet({
  array,
  deleteTask,
  diffFilter,
  subFilter,
}: ProblemSetPropsType): React.JSX.Element {
  const tmp = array.filter((element) => {
    let col = "all";
    if (element.diff < 400) {
      col = "gray";
    } else if (element.diff < 800) {
      col = "brawn";
    } else if (element.diff < 1200) {
      col = "green";
    } else if (element.diff < 1600) {
      col = "cyan";
    } else if (element.diff < 2000) {
      col = "blue";
    } else if (element.diff < 2400) {
      col = "yellow";
    } else if (element.diff < 2800) {
      col = "orange";
    } else {
      col = "red";
    }

    console.log(col);
    if (diffFilter === "all") {
      return true;
    }
    return diffFilter === col;
  });

  const resArray = tmp.filter((element) => {
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

  return (
    <div>
      <div className="is-vertical-center">
        {resArray.map((element, key: number) => {
          return <Card cardDetail={element} id={key} deleteTask={deleteTask} />;
        })}
      </div>
    </div>
  );
}

export default ProblemSet;
