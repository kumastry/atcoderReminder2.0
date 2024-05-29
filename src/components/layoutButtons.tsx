import { MdList, MdGridView } from "react-icons/md";
import classNames from "classnames";
import type { LayoutButtonsProps } from "./../types/props";

const LayoutButtons = ({
  layout,
  onClickLayoutHandler,
}: LayoutButtonsProps) => {
  return (
    <div className="layout_buttons">
      <div
        className={classNames("button is-large", {
          "is-link": layout === "list",
        })}
        onClick={() => onClickLayoutHandler("list")}
      >
        <span className="icon">
          <MdList />
        </span>
      </div>

      <div
        className={classNames("button is-large", {
          "is-link": layout === "grid",
        })}
        onClick={() => onClickLayoutHandler("grid")}
      >
        <span className="icon">
          <MdGridView />
        </span>
      </div>
    </div>
  );
};

export default LayoutButtons;
