import { expect, test } from "vitest";
import { formatBytes, formatDate } from "./index";
test("Should format the date in MM/DD/YYYY", () => {
    expect(formatDate("")).toBe("Invalid Date");
    expect(formatDate(undefined)).toBe("Invalid Date");
    expect(formatDate("1630103459973")).toBe("8/27/2021");
    expect(formatDate(1630103459973)).toBe("8/27/2021");
});
test("Should format binary bytes", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
    expect(formatBytes(2048)).toBe("2 KB");
    expect(formatBytes(Math.pow(2, 12))).toBe("4 KB");
    expect(formatBytes(Math.pow(2, 22))).toBe("4 MB");
    expect(formatBytes(Math.pow(2, 32))).toBe("4 GB");
});
