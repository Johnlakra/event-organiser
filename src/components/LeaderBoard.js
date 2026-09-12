import React, { useState, useEffect, useMemo } from "react";
import { startConfettiRain } from "../utils/confetti";
import "./LeaderBoard.css";

/** Ranks 1-3 are the ones worth a confetti shower. */
const PODIUM_RANKS = 3;

const totalPoints = (events = []) =>
  events.reduce((sum, event) => sum + (event.points ?? 0), 0);

const groupByParish = (events = []) =>
  Object.entries(
    events.reduce(
      (acc, event) => ({
        ...acc,
        [event.parish]: [...(acc[event.parish] ?? []), event],
      }),
      {}
    )
  )
    .map(([name, items]) => ({ name, events: items, points: totalPoints(items) }))
    .sort((a, b) => b.points - a.points);

const LeaderBoard = ({ data, celebrateTopThree = false }) => {
  const [openDeanery, setOpenDeanery] = useState(null);
  const [openParish, setOpenParish] = useState(null);

  const toggleDeanery = (id) => {
    setOpenDeanery((current) => (current === id ? null : id));
    setOpenParish(null);
  };

  const sorted = useMemo(
    () =>
      [...data].sort((a, b) => totalPoints(b.events) - totalPoints(a.events)),
    [data]
  );

  /**
   * On the year being scored, opening one of the top three deaneries showers
   * the whole window. Opening any other row (or closing the open one) re-runs
   * this effect, and the cleanup lets the confetti already in the air settle
   * instead of cutting it. Past editions are shown without any celebration.
   */
  useEffect(() => {
    if (!celebrateTopThree) return undefined;

    const rank = sorted.findIndex((deanery) => deanery.id === openDeanery);
    const isPodium =
      rank > -1 && rank < PODIUM_RANKS && totalPoints(sorted[rank].events) > 0;

    if (!isPodium) return undefined;

    return startConfettiRain(rank);
  }, [celebrateTopThree, openDeanery, sorted]);

  return (
    <div className="bsm-board">
      {sorted.map((deanery, index) => {
        const points = totalPoints(deanery.events);
        const isOpen = openDeanery === deanery.id;
        const parishes = groupByParish(deanery.events);
        const isBlank = deanery.events.length === 0;

        return (
          <div key={deanery.id} className="bsm-board-row">
            <button
              type="button"
              className="bsm-board-header"
              onClick={() => toggleDeanery(deanery.id)}
              aria-expanded={isOpen}
            >
              <span className="bsm-board-rank">{isBlank ? "—" : index + 1}</span>
              <span className="bsm-board-name">{deanery.name}</span>
              <span className="bsm-board-points">{points} pts</span>
              <span className="bsm-board-caret">{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
              <div className="bsm-board-body">
                {isBlank && (
                  <p className="bsm-board-blank">No results recorded yet.</p>
                )}

                {parishes.map((parish, parishIndex) => {
                  const parishId = `${deanery.id}-${parishIndex}`;
                  const isParishOpen = openParish === parishId;

                  return (
                    <div key={parishId} className="bsm-parish">
                      <button
                        type="button"
                        className="bsm-parish-header"
                        onClick={() =>
                          setOpenParish((current) =>
                            current === parishId ? null : parishId
                          )
                        }
                        aria-expanded={isParishOpen}
                      >
                        <span className="bsm-parish-name">
                          {parishIndex + 1}. {parish.name}
                        </span>
                        <span className="bsm-parish-points">
                          {parish.points} pts
                        </span>
                        <span className="bsm-board-caret">
                          {isParishOpen ? "▲" : "▼"}
                        </span>
                      </button>

                      {isParishOpen && (
                        <div className="bsm-parish-body">
                          <table className="bsm-board-table">
                            <thead>
                              <tr>
                                <th>Event</th>
                                <th>Position</th>
                                <th className="is-numeric">Points</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[...parish.events]
                                .sort((a, b) => b.points - a.points)
                                .map((event, eventIndex) => (
                                  <tr key={`${event.id}-${eventIndex}`}>
                                    <td>{event.name}</td>
                                    <td className="is-muted">{event.position}</td>
                                    <td className="is-numeric">{event.points}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LeaderBoard;
