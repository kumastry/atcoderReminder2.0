import type { CardPropsType } from "./../types/props";

function Card({
  cardDetail,
  deleteProblem,
  id,
}: CardPropsType): React.JSX.Element {
  // 問題の提出状況によってカード背景色を変更する
  let cardBackgroundColor = "";
  if (cardDetail.sub === "AC") {
    cardBackgroundColor = "#c8e4cc";
  } else if (cardDetail.sub !== "nosub") {
    cardBackgroundColor = "#fcecbc";
  } else {
    cardBackgroundColor = "#ffffff";
  }

  return (
    <div
      className="card"
      style={{ margin: "8px", backgroundColor: cardBackgroundColor }}
      key={id}
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
            onClick={() => deleteProblem(id)}
          />
        </footer>
      </div>
    </div>
  );
}

export default Card;
