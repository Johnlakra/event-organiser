const TIME_PATTERN = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i;

const HOURS_IN_HALF_DAY = 12;
const MINUTES_PER_HOUR = 60;
const MS_PER_MINUTE = 60 * 1000;

/**
 * Turns a schedule time such as "08:30 pm" into a Date on the given day.
 * Returns null for anything it cannot parse, so callers never build an
 * Invalid Date and silently compare NaN.
 */
export const parseScheduleTime = (value, referenceDate = new Date()) => {
  if (typeof value !== "string") return null;

  const match = value.trim().match(TIME_PATTERN);
  if (!match) return null;

  const [, rawHours, rawMinutes, meridiem] = match;
  const minutes = Number(rawMinutes);
  let hours = Number(rawHours);

  if (hours < 1 || hours > 12 || minutes < 0 || minutes >= MINUTES_PER_HOUR) {
    return null;
  }

  const isPm = meridiem.toLowerCase() === "pm";
  if (isPm && hours !== HOURS_IN_HALF_DAY) hours += HOURS_IN_HALF_DAY;
  if (!isPm && hours === HOURS_IN_HALF_DAY) hours = 0;

  return new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
    hours,
    minutes
  );
};

/**
 * An entry counts as "on now" for `durationMinutes` after its start time.
 */
export const isHappeningNow = (time, now = new Date(), durationMinutes = 60) => {
  const start = parseScheduleTime(time, now);
  if (!start) return false;
  const end = new Date(start.getTime() + durationMinutes * MS_PER_MINUTE);
  return now >= start && now < end;
};

export const toDayKey = (date = new Date()) =>
  date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
