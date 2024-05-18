import type { CardPropsType } from "./../types/props";
import getCardBackgroundColor from "./../logic/getCardBackgroundColor";

function Card({
  cardDetail,
  deleteProblem,
  id,
}: CardPropsType): React.JSX.Element {
  // 問題の提出状況によってカード背景色を変更する
  console.log("card");
  return (
    <div
      className="card"
      style={{
        margin: "8px",
        backgroundColor: getCardBackgroundColor(cardDetail.sub),
      }}
      key={id}
    >
      <div className="card-content">
        <p className="title">
          <span>
            <button
              className="delete is-large is-pulled-right"
              onClick={() => deleteProblem(id)}
            ></button>
          </span>
          <a href={cardDetail.url} target="_black">
            <p>{cardDetail.contest + " " + cardDetail.title}</p>
            <p>{String(cardDetail.diff)}</p>
          </a>
        </p>
        <p className="subtitle">{cardDetail.user}</p>
      </div>
    </div>
  );
}

export default Card;
