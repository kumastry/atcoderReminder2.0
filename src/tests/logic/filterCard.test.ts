import { describe, expect, test } from "vitest";
import { filterByColor, filterBySub } from "../../logic/filterCard";

describe.concurrent("fillter by color test", () => {
  describe.concurrent("gray test", () => {
    test("0 is gray diff", () => {
      expect(filterByColor(0, "gray")).toEqual(true);
    });

    test("under 0 is gray diff", () => {
      expect(filterByColor(-40, "gray")).toEqual(true);
    });

    test("400 is not gray diff", () => {
      expect(filterByColor(400, "gray")).toEqual(false);
    });
  });

  describe.concurrent("brown test", () => {
    test("401 is brown diff", () => {
      expect(filterByColor(401, "brown")).toEqual(true);
    });

    test("800 is not brown diff", () => {
      expect(filterByColor(800, "brown")).toEqual(false);
    });
  });

  describe.concurrent("green test", () => {
    test("801 is green diff", () => {
      expect(filterByColor(801, "green")).toEqual(true);
    });

    test("1200 is not green diff", () => {
      expect(filterByColor(1200, "green")).toEqual(false);
    });
  });

  describe.concurrent("cyan test", () => {
    test("1201 is cyan diff", () => {
      expect(filterByColor(1201, "cyan")).toEqual(true);
    });

    test("1600 is not cyan diff", () => {
      expect(filterByColor(1600, "cyan")).toEqual(false);
    });
  });

  describe.concurrent("blue test", () => {
    test("1601 is blue diff", () => {
      expect(filterByColor(1601, "blue")).toEqual(true);
    });

    test("2000 is not blue diff", () => {
      expect(filterByColor(2000, "blue")).toEqual(false);
    });
  });

  describe.concurrent("yellow test", () => {
    test("2001 is yellow diff", () => {
      expect(filterByColor(2001, "yellow")).toEqual(true);
    });

    test("2400 is not yellow diff", () => {
      expect(filterByColor(2400, "yellow")).toEqual(false);
    });
  });

  describe.concurrent("orange test", () => {
    test("2401 is orange diff", () => {
      expect(filterByColor(2400, "orange")).toEqual(true);
    });

    test("2800 is not orange diff", () => {
      expect(filterByColor(2800, "cyan")).toEqual(false);
    });
  });

  describe.concurrent("red test", () => {
    test("2799 is not red diff", () => {
      expect(filterByColor(2799, "red")).toEqual(false);
    });

    test("INF is red diff", () => {
      expect(filterByColor(1e15, "red")).toEqual(true);
    });
  });

  describe.concurrent("all test", () => {
    test("all is all diff 1", () => {
      expect(filterByColor(-1, "all")).toEqual(true);
    });

    test("all is all diff 2", () => {
      expect(filterByColor(690, "all")).toEqual(true);
    });

    test("all is all diff 3", () => {
      expect(filterByColor(1e13, "all")).toEqual(true);
    });
  });
});

describe.concurrent("fillter by Submission test", () => {
  describe.concurrent("AC test", () => {
    test("AC to AC", () => {
      expect(filterBySub("AC", "AC")).toEqual(true);
    });

    test("WA to AC", () => {
      expect(filterBySub("WA", "AC")).toEqual(false);
    });

    test("nosub to AC", () => {
      expect(filterBySub("nosub", "AC")).toEqual(false);
    });
  });

  describe.concurrent("WA test", () => {
    test("WA to WA", () => {
      expect(filterBySub("WA", "WA")).toEqual(true);
    });

    test("AC to WA", () => {
        expect(filterBySub("AC", "WA")).toEqual(false);
    });

    test("nosub to WA", () => {
        expect(filterBySub("nosub", "WA")).toEqual(false);
    });

    test("TLE to WA", () => {
        expect(filterBySub("TLE", "WA")).toEqual(true);
    });

    test("MLE to WA", () => {
        expect(filterBySub("MLE", "WA")).toEqual(true);
    });

    test("CE to WA", () => {
        expect(filterBySub("CE", "WA")).toEqual(true);
    });
  });

  describe.concurrent("nosub test", () => {
    test("nosub to nosub", () => {
      expect(filterBySub("nosub", "nosub")).toEqual(true);
    });

    test("AC to nosub", () => {
        expect(filterBySub("AC", "nosub")).toEqual(false);
    });

    test("WA to nosub", () => {
        expect(filterBySub("WA", "nosub")).toEqual(false);
    });
  });
});
