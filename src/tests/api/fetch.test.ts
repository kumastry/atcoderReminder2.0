import { describe, expect, test, vi, afterAll } from "vitest";
import { fetchProblemData, fetchProblemDiff } from "../../main/api.ts";
import * as fetcher from "../../main/fetcher.ts";
import { problemData, problemsDiff } from "./fixture.ts";

describe.concurrent("fetchProblemData api test", () => {
  const spy = vi.spyOn(fetcher, "fetchJson").mockResolvedValue(problemData);

  afterAll(() => {
    spy.mockRestore();
  });

  test("idが見つかる時", async () => {
    expect(await fetchProblemData("1202Contest_a")).toEqual({
      id: "1202Contest_a",
      contest_id: "DEGwer2023",
      problem_index: "A",
      name: "DEGwer's Doctoral Dissertation",
      title: "A. DEGwer's Doctoral Dissertation",
    });
  });

  test("idが見つからない時", async () => {
    expect(await fetchProblemData("123")).toEqual(undefined);
  });
});

describe.concurrent("fetchProblemDiff api test", () => {
  const spy = vi.spyOn(fetcher, "fetchJson").mockResolvedValue(problemsDiff);

  afterAll(() => {
    spy.mockRestore();
  });

  test("problem_idが見つかる時", async () => {
    expect(await fetchProblemDiff("abc138_a")).toBeCloseTo(-848);
  });

  test("problem_idが見つからないとき", async () => {
    expect(await fetchProblemDiff("123")).toBeCloseTo(0);
  });

  spy.mockRestore();
});

// describe.concurrent("fetchUserSubmission api test", () => {
//   const spy = vi.spyOn(fetcher, "fetchJson").mockResolvedValue(problemsDiff);

//   afterAll(() => {
//     spy.mockRestore();
//   });

//   test("problem_idが見つかる時", async () => {
//     expect(await fetchUserSubmission("kumastry", "abc_b"))
//   });

//   spy.mockRestore();
// });
