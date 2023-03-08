import { expect, test } from "vitest";
import { getUrlHash } from "./index";
test("Should get the correct hash", () => {
    expect(getUrlHash("http://localhost:5473/")).toBe("");
    expect(getUrlHash("http://localhost:5473/#/Files")).toBe("Files");
    expect(getUrlHash("http://thewall.com/#/firstPart/secondPart/thirdPart")).toBe("firstPart/secondPart/thirdPart");
    expect(getUrlHash("http://thewall.com/#/firstPart?bogusQueryParam=thewall&bogus2=theblack")).toBe("firstPart");
    expect(getUrlHash("http://thewall.com?bogusQueryParam=thewall#/firstPart/secondPart")).toBe("firstPart/secondPart");
});
