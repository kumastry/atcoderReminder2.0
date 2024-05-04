import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Card from "../../components/card";
import "@testing-library/jest-dom";
import type { CardDetailType } from "./../../types/props";

describe("問題カードテスト", () => {
  // フィクスチャーでやるべき
  const cardDetail: CardDetailType = {
    sub: "AC",
    title: "hey",
    url: "http:example.com",
    diff: 400,
    contest: "abc999",
    user: "kumastry",
  };
  const deleteProblem = vi.fn();
  beforeEach(() => {
    render(
      <Card deleteProblem={deleteProblem} cardDetail={cardDetail} id={1} />,
    );
  });

  test("カードにユーザ名が表示されている", async () => {
    const element = screen.getByText("user:" + cardDetail.user);
    expect(element).toBeVisible();
  });

  test("カードにリンクがある", async () => {
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", cardDetail.url);
  });

  test("カードにリンクテキストがある", async () => {
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveTextContent(
      cardDetail.contest + " " + cardDetail.title,
    );
    expect(linkElement).toHaveTextContent(
      "diff:" + cardDetail.diff + " submission:" + cardDetail.sub,
    );
  });

  // スタイルはcssファイルでやるかもしれないので、削除するのもあり
  test("カードの背景色が茶色", async () => {

  });

  test("カードのdeleteボタンを押したら関数が実行", async () => {
    const buttonElement = screen.getByRole("button");
    fireEvent.click(
      buttonElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(deleteProblem).toHaveBeenCalledTimes(1);
  });
});
