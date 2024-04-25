import { describe, expect, test } from "vitest";
import getCardBackgroundColor from "../../logic/getCardBackgroundColor";

describe.concurrent("card background color test", () => {
  test("AC to green ", () => {
    expect(getCardBackgroundColor("AC")).toEqual("#c8e4cc");
  });

  test("nosub to white", () => {
    expect(getCardBackgroundColor("nosub")).toEqual("#ffffff");
  });

  test("WA(includes CE, RE, TLE, MLE etc.....)", () => {
    expect(getCardBackgroundColor("WA")).toEqual("#fcecbc");
    expect(getCardBackgroundColor("TLE")).toEqual("#fcecbc");
  });
});
