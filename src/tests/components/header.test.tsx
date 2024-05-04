import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import Header from "../../components/header";
import "@testing-library/jest-dom";

describe("ヘッダーテスト", () => {
  beforeEach(() => {
    render(<Header />);
  });

  test("ヘッダーに文字が表示されること", async () => {
    const headerElement = screen.getByText("AtCoder Reminder");
    expect(headerElement).toBeVisible();
    expect(headerElement).toHaveTextContent("AtCoder Reminder");
  });

  test("ヘッダーに適切なロールが付与されているか", async () => {
    expect(screen.getByRole("heading")).toBeInTheDocument;
  });
});
