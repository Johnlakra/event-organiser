import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LiveEvents from "../components/LiveEvents";
import { getLiveOnStageItems } from "../redux/liveonstage/liveonstageSlice";
import { getLeaderBoardItems } from "../redux/leaderBoard/leaderBoardSlice";
import { getDropdown } from "../redux/dropdown/dropdownSlice";
import { useCountdown } from "../utils/countdown";
import { pickArchiveYear } from "../utils/years";
import { MEET, HOME_NOTICE, HOME_STATS } from "../data/meet2026";
import "./Home.css";

const PODIUM_PLACES = [
  { label: "1st · Champions", accent: "var(--bsm-gold)" },
  { label: "2nd · Runners-up", accent: "var(--bsm-silver)" },
  { label: "3rd · Third place", accent: "var(--bsm-bronze)" },
];

/** Top three deaneries by total points for a single edition. */
const buildPodium = (rows = []) => {
  const totals = rows.reduce((acc, row) => {
    const current = acc[row.deanery] ?? { points: 0, wins: 0 };
    return {
      ...acc,
      [row.deanery]: {
        points: current.points + (row.point ?? 0),
        wins: current.wins + ((row.point ?? 0) > 0 ? 1 : 0),
      },
    };
  }, {});

  return Object.entries(totals)
    .map(([name, value]) => ({ name, ...value }))
    .sort((a, b) => b.points - a.points)
    .slice(0, PODIUM_PLACES.length);
};

const Home = () => {
  const dispatch = useDispatch();
  const [liveEvents, setLiveEvents] = useState([]);
  const [archiveYear, setArchiveYear] = useState(null);
  const [resultsByYear, setResultsByYear] = useState({});
  const countdown = useCountdown(MEET.startsAt, MEET.endsAt);

  const fetchAll = useCallback(async () => {
    const [stage, dropdown, board] = await Promise.all([
      dispatch(getLiveOnStageItems()),
      dispatch(getDropdown()),
      dispatch(getLeaderBoardItems()),
    ]);

    if (!stage?.error) setLiveEvents(stage?.payload ?? []);
    if (!dropdown?.error) setArchiveYear(pickArchiveYear(dropdown?.payload?.year ?? []));
    if (!board?.error) setResultsByYear(board?.payload ?? {});
  }, [dispatch]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const podium = useMemo(
    () => (archiveYear ? buildPodium(resultsByYear[archiveYear.name] ?? []) : []),
    [archiveYear, resultsByYear]
  );

  return (
    <div className="bsm-home">
      <section className="bsm-hero">
        <div className="bsm-shell bsm-hero-inner">
          <p className="bsm-hero-scripture">
            {MEET.scripture.text} — {MEET.scripture.reference}
          </p>
          <p className="bsm-hero-edition">{MEET.edition}</p>
          <h1 className="bsm-hero-title">{MEET.title}</h1>
          <p className="bsm-hero-window">{MEET.window}</p>
          <p className="bsm-hero-venue">
            {MEET.venue} · {MEET.organiser}
          </p>

          {countdown && (
            <div className="bsm-countdown">
              <p className="bsm-countdown-label">{countdown.label}</p>
              <div className="bsm-countdown-parts">
                {countdown.parts.map((part) => (
                  <div key={part.label} className="bsm-countdown-part">
                    <div className="bsm-countdown-value">{part.value}</div>
                    <div className="bsm-countdown-unit">{part.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bsm-hero-actions">
            <Link to="/leaderboard" className="bsm-btn">
              Leaderboard
            </Link>
            <Link to="/schedule" className="bsm-btn bsm-btn--outline">
              Schedule
            </Link>
          </div>
        </div>
      </section>

      <div className="bsm-notice-strip">
        <div className="bsm-shell bsm-notice-inner">
          <span className="bsm-notice-tag">Notice</span>
          <span className="bsm-notice-text">{HOME_NOTICE}</span>
        </div>
      </div>

      <section className="bsm-shell bsm-home-section">
        <div className="bsm-home-section-head">
          <h2 className="bsm-home-heading">Live on stage</h2>
          {liveEvents.some((event) => event.live) && (
            <span className="bsm-updating">
              <span className="bsm-updating-dot" />
              Updating live
            </span>
          )}
        </div>
        <LiveEvents events={liveEvents} />
      </section>

      <section className="bsm-shell bsm-home-section">
        <div className="bsm-stats">
          {HOME_STATS.map((stat) => (
            <div key={stat.label} className="bsm-stat">
              <div className="bsm-stat-value">{stat.value}</div>
              <div className="bsm-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {podium.length > 0 && (
        <section className="bsm-shell bsm-home-section bsm-home-section--last">
          <div className="bsm-home-section-head">
            <div>
              <p className="bsm-eyebrow">Last year</p>
              <h2 className="bsm-home-heading">
                Overall champions, BSMCSM {archiveYear.name}
              </h2>
            </div>
            <Link to="/leaderboard" className="bsm-archive-link">
              View {archiveYear.name} archive
            </Link>
          </div>

          <div className="bsm-podium">
            {podium.map((entry, index) => (
              <div
                key={entry.name}
                className="bsm-podium-card"
                style={{ borderTopColor: PODIUM_PLACES[index].accent }}
              >
                <div className="bsm-label">{PODIUM_PLACES[index].label}</div>
                <div className="bsm-podium-name">{entry.name}</div>
                <div className="bsm-podium-meta">
                  {entry.points} pts · {entry.wins} events won
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
