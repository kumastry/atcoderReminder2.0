import type { CardPropsType } from "./../types/props";

function Card({
  cardDetail,
  deleteTask,
  id,
}: CardPropsType): React.JSX.Element {
  let background = "";
  if (cardDetail.sub === "AC") {
    background = "#c8e4cc";
  } else if (cardDetail.sub !== "nosub") {
    background = "#fcecbc";
  } else {
    background = "#ffffff";
  }

  return (
    <div
      className="card"
      style={{ margin: "8px", backgroundColor: background }}
    >
      <div className="card-content">
        <p className="title">
          <a href={cardDetail.url} target="_black">
            {cardDetail.contest + " " + cardDetail.title}
            <br />
            {"diff:" + cardDetail.diff + " submission:" + cardDetail.sub}
            <br />
          </a>
        </p>

        <p className="subtitle">user:{cardDetail.user}</p>

        <footer className="card-footer">
          <input
            type="button"
            value="delete"
            className="card-footer-item"
            onClick={() => deleteTask(id)}
          />
        </footer>
      </div>
    </div>
  );
}

export default Card;
