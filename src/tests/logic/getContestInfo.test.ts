import { describe, expect, test } from "vitest";
import getContestInfo from "../../logic/getContestInfo";

describe.concurrent("get contest infomation from URL test", () => {
  test("not atcoder.jp URL to throwing error as this is not an atcoder URL", () => {
    expect(() =>
      getContestInfo(new URL("https://twitter.com/home")),
    ).toThrowError(/^this is not an atcoder URL$/);
  });

  test("not atcoder.jp URL to throwing error as Invalid URL", () => {
    expect(() =>
      getContestInfo(new URL("https://atcoder.jp/contests/abc314/tasks/")),
    ).toThrowError(/^Wrong URL pathname$/);
  });

  test("correct atcoder.jp URL ", () => {
    expect(
      getContestInfo(
        new URL("https://atcoder.jp/contests/abc314/tasks/abc314_a"),
      ),
    ).toEqual({
      contest: "abc314",
      problemId: "abc314_a",
    });
  });
});
