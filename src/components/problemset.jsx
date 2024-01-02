import Card from "./card";

function ProblemSet(props) {
  const tmp = props.array.filter((array) => {
    let col = "all";
    if (array.diff < 400) {
      col = "gray";
    } else if (array.diff < 800) {
      col = "brawn";
    } else if (array.diff < 1200) {
      col = "green";
    } else if (array.diff < 1600) {
      col = "cyan";
    } else if (array.diff < 2000) {
      col = "blue";
    } else if (array.diff < 2400) {
      col = "yellow";
    } else if (array.diff < 2800) {
      col = "orange";
    } else {
      col = "red";
    }

    console.log(col);
    if (props.diffFilter === "all") {
      return true;
    }
    return props.diffFilter === col;
  });

  const resArray = tmp.filter((array) => {
    let sub = "all";
    if (array.sub === "AC") {
      sub = "AC";
    } else if (array.sub === "WA") {
      sub = "WA";
    } else if (array.sub === "nosub") {
      sub = "nosub";
    }

    if (props.subFilter === "all") {
      return true;
    }
    return props.subFilter === sub;
  });

  return (
    <div>
      <div className="is-vertical-center">
        {resArray.map((array, key) => {
          return array !== "init" ? (
            <Card array={array} id={key} deleteTask={props.deleteTask} />
          ) : (
            <p></p>
          );
        })}
      </div>
    </div>
  );
}

export default ProblemSet;
