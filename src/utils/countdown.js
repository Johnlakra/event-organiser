import { useEffect, useState } from "react";

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

const pad = (value) => String(value).padStart(2, "0");

/**
 * Counts down to `startsAt`, then reports the meet as under way until `endsAt`.
 * Returns null if either boundary is not a valid date.
 */
export const useCountdown = (startsAt, endsAt) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), MS_PER_SECOND);
    return () => clearInterval(id);
  }, []);

  const start = new Date(startsAt).getTime();
  const end = new Date(endsAt).getTime();
  if (Number.isNaN(start) || Number.isNaN(end)) return null;

  const remaining = Math.max(0, start - now);
  const hasStarted = now >= start;
  const hasEnded = now > end;

  const label = hasEnded
    ? "The meet has concluded"
    : hasStarted
    ? "The meet is under way"
    : "Counting down to the opening";

  return {
    label,
    hasStarted,
    hasEnded,
    parts: [
      { label: "Days", value: String(Math.floor(remaining / MS_PER_DAY)) },
      { label: "Hours", value: pad(Math.floor(remaining / MS_PER_HOUR) % 24) },
      { label: "Minutes", value: pad(Math.floor(remaining / MS_PER_MINUTE) % 60) },
      { label: "Seconds", value: pad(Math.floor(remaining / MS_PER_SECOND) % 60) },
    ],
  };
};
