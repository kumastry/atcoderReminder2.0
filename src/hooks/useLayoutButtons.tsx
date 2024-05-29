import { useState, useEffect } from "react";
import type { LayoutType } from "./../types/base";

const useLayoutButtons = () => {
  const [layout, setLayout] = useState<LayoutType>();

  const onClickLayoutHandler = (problemLayout: LayoutType) => {
    setLayout(problemLayout);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      if (layout) {
        localStorage.setItem("layout", layout);
      }
    });
  }, [layout]);

  useEffect(() => {
    const lay: LayoutType =
      (localStorage.getItem("layout") as LayoutType | null) || "list";
    setLayout(lay);
  }, []);

  return { layout, onClickLayoutHandler };
};

export default useLayoutButtons;
