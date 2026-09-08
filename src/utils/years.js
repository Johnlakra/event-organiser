export const CURRENT_YEAR_STATUS = 1;

const isCurrent = (year) => Number(year?.status) === CURRENT_YEAR_STATUS;

/** The edition being scored, falling back to the newest year on record. */
export const pickCurrentYear = (years = []) =>
  years.find(isCurrent) ?? years[0] ?? null;

/** The most recent completed edition — what the archive tab and podium show. */
export const pickArchiveYear = (years = []) =>
  years.find((year) => !isCurrent(year)) ?? null;

/**
 * Newest edition first. The API returns years in table order, and the UI
 * wants the live year at the head of the tab list.
 */
export const sortYearsDesc = (years = []) =>
  [...years].sort((a, b) => String(b.name).localeCompare(String(a.name)));

export const findYearById = (years = [], id) =>
  years.find((year) => String(year.id) === String(id)) ?? null;
