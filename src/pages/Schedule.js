import React, { useState, useEffect, useMemo } from "react";
import {
  SCHEDULE_2026,
  MEET_NOTICE,
  MEAL_TIMES,
} from "../data/schedule2026";
import { isHappeningNow, toDayKey } from "../utils/time";
import "./Schedule.css";

const REFRESH_INTERVAL_MS = 60 * 1000;

const splitDayLabel = (label) => {
  const [title, subtitle] = String(label).split("·");
  return { title: title.trim(), subtitle: (subtitle ?? "").trim() };
};

const findTodayIndex = (schedule, now) => {
  const key = toDayKey(now);
  return schedule.findIndex((day) => day.date === key);
};

const Schedule = () => {
  const [now, setNow] = useState(() => new Date());
  const [activeTab, setActiveTab] = useState(() => {
    const index = findTodayIndex(SCHEDULE_2026, new Date());
    return index === -1 ? 0 : index;
  });

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const todayIndex = useMemo(() => findTodayIndex(SCHEDULE_2026, now), [now]);
  const activeDay = SCHEDULE_2026[activeTab];
  const isViewingToday = todayIndex === activeTab;

  return (
    <section className="bsm-page bsm-page--narrow">
      <h1 className="bsm-page-title">Schedule</h1>
      <p className="bsm-page-lede">
        Official timings from the BSMCSM 2026 timetable. Final timings are
        confirmed at the venue.
      </p>

      <div className="bsm-notice bsm-schedule-notice">
        <strong>{MEET_NOTICE.label}:</strong> {MEET_NOTICE.body}
      </div>

      <div className="bsm-tabs bsm-tabs--days" role="tablist" aria-label="Schedule day">
        {SCHEDULE_2026.map((day, index) => {
          const { title, subtitle } = splitDayLabel(day.label ?? day.date);
          const isActive = index === activeTab;

          return (
            <button
              key={day.date}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`bsm-tab bsm-tab--day${isActive ? " is-active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              <span className="bsm-tab-title">{title}</span>
              {subtitle && <span className="bsm-tab-subtitle">{subtitle}</span>}
              {isActive && <span className="bsm-tab-underline" />}
            </button>
          );
        })}
      </div>

      <div className="bsm-schedule-list">
        {activeDay.events.map((event, index) => {
          const isMeal = event.type === "meal";
          const isLive =
            isViewingToday && !isMeal && isHappeningNow(event.time, now);

          return (
            <div
              key={`${event.time}-${event.event}-${index}`}
              className={`bsm-schedule-row${isMeal ? " is-meal" : ""}${
                isLive ? " is-live" : ""
              }`}
            >
              <span className="bsm-schedule-time">{event.time}</span>
              <span className="bsm-schedule-event">
                {event.event}
                {isLive && <span className="bsm-now-badge">Now</span>}
              </span>
              <span className="bsm-schedule-venue">{event.venue}</span>
            </div>
          );
        })}
      </div>

      <div className="bsm-card bsm-meal-card">
        <h2 className="bsm-section-heading">Meal times</h2>
        <div className="bsm-meal-grid">
          {MEAL_TIMES.map((meal) => (
            <div key={meal.name} className="bsm-meal">
              <span className="bsm-meal-name">{meal.name}</span>
              <span className="bsm-meal-window">{meal.window}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
