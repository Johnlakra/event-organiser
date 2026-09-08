import { SCHEDULE_2026, MEET_DATES, MEET_NOTICE } from "../schedule2026";
import { parseScheduleTime } from "../../utils/time";

describe("BSMCSM 2026 schedule data", () => {
  test("covers the three meet days from the timetable", () => {
    expect(SCHEDULE_2026.map((day) => day.date)).toEqual([
      "10/09/2026",
      "11/09/2026",
      "12/09/2026",
    ]);
  });

  test("every entry has a time that the timeline can parse", () => {
    const unparseable = SCHEDULE_2026.flatMap((day) =>
      day.events
        .filter((event) => parseScheduleTime(event.time) === null)
        .map((event) => `${day.date} ${event.time} ${event.event}`)
    );
    expect(unparseable).toEqual([]);
  });

  test("entries within a day are in chronological order", () => {
    SCHEDULE_2026.forEach((day) => {
      const minutes = day.events.map((event) => {
        const parsed = parseScheduleTime(event.time);
        return parsed.getHours() * 60 + parsed.getMinutes();
      });
      const sorted = [...minutes].sort((a, b) => a - b);
      expect(minutes).toEqual(sorted);
    });
  });

  test("carries the 2026 dates and the musical album deadline", () => {
    expect(MEET_DATES).toContain("2026");
    expect(MEET_NOTICE.body).toContain("8th September 2026");
  });

  test("keeps 2025-only items out of the timetable", () => {
    const names = SCHEDULE_2026.flatMap((day) =>
      day.events.map((event) => event.event.toLowerCase())
    );
    ["bible skit", "tableau", "mimicry", "water color painting"].forEach((dropped) => {
      expect(names).not.toContain(dropped);
    });
  });

  test("includes the events the 2026 timetable added", () => {
    const names = SCHEDULE_2026.flatMap((day) =>
      day.events.map((event) => event.event)
    ).join(" | ");
    ["Diocese Got Talent", "Face Painting", "Silent Play", "Choreography"].forEach(
      (added) => expect(names).toContain(added)
    );
  });
});
