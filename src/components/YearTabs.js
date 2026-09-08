import React from "react";
import { CURRENT_YEAR_STATUS } from "../utils/years";

/**
 * Year switcher for the leaderboard. `years` are dropdown rows
 * ({ id, name, status }); status === 1 marks the edition in progress.
 */
const YearTabs = ({ years, selectedYearId, onSelect }) => {
  if (!years || years.length === 0) return null;

  return (
    <div className="bsm-tabs" role="tablist" aria-label="Leaderboard year">
      {years.map((year) => {
        const isSelected = String(year.id) === String(selectedYearId);
        const isCurrent = Number(year.status) === CURRENT_YEAR_STATUS;

        return (
          <button
            key={year.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className="bsm-tab"
            onClick={() => onSelect(year.id)}
          >
            {year.name} · {isCurrent ? "Live" : "Archive"}
            {isSelected && <span className="bsm-tab-underline" />}
          </button>
        );
      })}
    </div>
  );
};

export default YearTabs;
