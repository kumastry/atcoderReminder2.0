import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import Footer from "../../components/footer";
import "@testing-library/jest-dom";

describe("フッターテスト", () => {
  beforeEach(() => {
    render(<Footer />);
  });
  test("フッターにコピーライトが表示されている", async () => {
    expect(screen.getByText("2024©kumastry")).toBeInTheDocument;
  });

  test("フッターに適切なロールが付与されているか", async () => {
    expect(screen.getByRole("contentinfo")).toBeInTheDocument;
  });

//   test("リンクが存在しているのか", async () => {
//     expect(screen.getByRole("button")).toBeInTheDocument;
//   })


});
