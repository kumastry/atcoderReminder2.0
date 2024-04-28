import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import Header from "../../components/header";
import "@testing-library/jest-dom";

describe("ヘッダーテスト", () => {
  beforeEach(() => {
    render(<Header />);
  });
  test("ヘッダーに文字が表示されること", async () => {
    expect(screen.getByText("AtCoder Reminder")).toBeInTheDocument;
  });

  test("ヘッダーに適切なロールが付与されているか", async () => {
    expect(screen.getByRole("heading")).toBeInTheDocument;
  });
});
