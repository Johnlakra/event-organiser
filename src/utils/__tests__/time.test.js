import { parseScheduleTime, isHappeningNow, toDayKey } from "../time";

const onDay = (h, m) => new Date(2026, 8, 11, h, m);

describe("parseScheduleTime", () => {
  test("parses a morning time onto the reference day", () => {
    // Arrange
    const reference = onDay(0, 0);

    // Act
    const parsed = parseScheduleTime("09:30 am", reference);

    // Assert
    expect(parsed.getHours()).toBe(9);
    expect(parsed.getMinutes()).toBe(30);
    expect(parsed.getDate()).toBe(11);
  });

  test("shifts afternoon times into 24-hour form", () => {
    expect(parseScheduleTime("03:30 pm", onDay(0, 0)).getHours()).toBe(15);
  });

  test("treats 12 am as midnight and 12 pm as noon", () => {
    expect(parseScheduleTime("12:00 am", onDay(0, 0)).getHours()).toBe(0);
    expect(parseScheduleTime("12:00 pm", onDay(0, 0)).getHours()).toBe(12);
  });

  test("returns null for unparseable input instead of an Invalid Date", () => {
    expect(parseScheduleTime("noon", onDay(0, 0))).toBeNull();
    expect(parseScheduleTime("25:00 am", onDay(0, 0))).toBeNull();
    expect(parseScheduleTime("09:75 am", onDay(0, 0))).toBeNull();
    expect(parseScheduleTime(undefined, onDay(0, 0))).toBeNull();
  });
});

describe("isHappeningNow", () => {
  test("is true inside the event window", () => {
    expect(isHappeningNow("09:00 am", onDay(9, 30))).toBe(true);
  });

  test("is false once the window has elapsed", () => {
    expect(isHappeningNow("09:00 am", onDay(10, 1))).toBe(false);
  });

  test("is false before the event starts", () => {
    expect(isHappeningNow("09:00 am", onDay(8, 59))).toBe(false);
  });

  test("is false for an unparseable time", () => {
    expect(isHappeningNow("whenever", onDay(9, 30))).toBe(false);
  });
});

describe("toDayKey", () => {
  test("formats as dd/MM/yyyy to match the schedule dates", () => {
    expect(toDayKey(new Date(2026, 8, 11))).toBe("11/09/2026");
  });
});
