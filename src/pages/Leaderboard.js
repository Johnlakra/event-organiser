import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import LeaderBoard from "../components/LeaderBoard";
import YearTabs from "../components/YearTabs";
import { getLeaderBoardItems } from "../redux/leaderBoard/leaderBoardSlice";
import { getDropdown } from "../redux/dropdown/dropdownSlice";
import {
  pickCurrentYear,
  findYearById,
  sortYearsDesc,
  CURRENT_YEAR_STATUS,
} from "../utils/years";
import "./Leaderboard.css";

const PODIUM_PLACES = ["Champions", "Runners-up", "Third place"];

const groupByDeanery = (rows) =>
  Object.entries(
    rows.reduce(
      (acc, row) => ({ ...acc, [row.deanery]: [...(acc[row.deanery] ?? []), row] }),
      {}
    )
  ).map(([name, items], index) => ({
    id: `d-${index}`,
    name,
    events: items.map((item) => ({
      id: item.id,
      name: item.event,
      position: item.position,
      points: item.point ?? 0,
      parish: item.parish,
    })),
  }));

/** Before any result is entered, every deanery still belongs on the board at 0. */
const emptyBoardFrom = (deaneries = []) =>
  deaneries.map((deanery) => ({
    id: `empty-${deanery.id}`,
    name: deanery.name,
    events: [],
  }));

const buildPodium = (board) =>
  [...board]
    .map((deanery) => ({
      name: deanery.name,
      points: deanery.events.reduce((sum, event) => sum + event.points, 0),
      wins: deanery.events.filter((event) => event.points > 0).length,
    }))
    .sort((a, b) => b.points - a.points)
    .slice(0, PODIUM_PLACES.length);

const Leaderboard = () => {
  const dispatch = useDispatch();
  const [years, setYears] = useState([]);
  const [deaneries, setDeaneries] = useState([]);
  const [resultsByYear, setResultsByYear] = useState({});
  const [selectedYearId, setSelectedYearId] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const [dropdown, board] = await Promise.all([
        dispatch(getDropdown()),
        dispatch(getLeaderBoardItems()),
      ]);

      if (dropdown?.error || board?.error) {
        throw new Error(
          dropdown?.error?.message ??
            board?.error?.message ??
            "Failed to load the leaderboard"
        );
      }

      const availableYears = sortYearsDesc(dropdown?.payload?.year ?? []);
      setYears(availableYears);
      setDeaneries(dropdown?.payload?.deanery ?? []);
      setResultsByYear(board?.payload ?? {});
      setSelectedYearId(
        (current) => current ?? pickCurrentYear(availableYears)?.id ?? null
      );
      setStatus("succeeded");
    } catch (err) {
      setError(err.message ?? "Failed to load the leaderboard");
      setStatus("failed");
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const selectedYear = useMemo(
    () => findYearById(years, selectedYearId),
    [years, selectedYearId]
  );

  const rows = useMemo(
    () => (selectedYear ? resultsByYear[selectedYear.name] ?? [] : []),
    [resultsByYear, selectedYear]
  );

  const isCurrentYear = Number(selectedYear?.status) === CURRENT_YEAR_STATUS;
  const hasResults = rows.length > 0;

  const board = useMemo(() => {
    if (hasResults) return groupByDeanery(rows);
    return isCurrentYear ? emptyBoardFrom(deaneries) : [];
  }, [hasResults, rows, isCurrentYear, deaneries]);

  const podium = useMemo(
    () => (hasResults && !isCurrentYear ? buildPodium(board) : []),
    [hasResults, isCurrentYear, board]
  );

  return (
    <section className="bsm-page bsm-page--wide">
      <h1 className="bsm-page-title">Leaderboard</h1>
      <p className="bsm-page-lede">
        Points by deanery. Individual events: 15 / 10 / 5. Group events: 30 / 25
        / 20.
      </p>

      <YearTabs
        years={years}
        selectedYearId={selectedYearId}
        onSelect={setSelectedYearId}
      />

      {status === "loading" && <p className="bsm-board-status">Loading results…</p>}

      {status === "failed" && (
        <p className="bsm-board-status">
          {error} —{" "}
          <button type="button" className="bsm-linklike" onClick={fetchAll}>
            retry
          </button>
        </p>
      )}

      {status === "succeeded" && (
        <>
          {!hasResults && isCurrentYear && (
            <div className="bsm-notice bsm-board-notice">
              Scoring for {selectedYear?.name} starts on 10 September. All{" "}
              {deaneries.length} deaneries begin at 0 points; the table updates
              from the admin panel as results come in.
            </div>
          )}

          {podium.length > 0 && (
            <div className="bsm-board-podium">
              {podium.map((entry, index) => (
                <div key={entry.name} className="bsm-board-podium-card">
                  <div className="bsm-board-podium-place">
                    {PODIUM_PLACES[index]}
                  </div>
                  <div className="bsm-board-podium-name">{entry.name}</div>
                  <div className="bsm-board-podium-meta">
                    {entry.points} pts · {entry.wins} events won
                  </div>
                </div>
              ))}
            </div>
          )}

          {board.length > 0 ? (
            <LeaderBoard data={board} />
          ) : (
            <div className="bsm-empty">
              <p className="bsm-empty-title">
                No results for {selectedYear?.name ?? "this year"}
              </p>
              <p className="bsm-empty-body">
                Results appear here once they are entered in the admin panel.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Leaderboard;
