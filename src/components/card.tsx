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
        backgroundColor: getCardBackgroundColor(cardDetail.sub),
      }}
      key={id}
    >
      <div className="card-content">
        <div className="title is-5">
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
        </div>
        <p className="subtitle is-6">{cardDetail.user}</p>
      </div>
    </div>
  );
}

export default Card;
