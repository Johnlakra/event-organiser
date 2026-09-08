import React from "react";
import { EVENT_GROUPS, EVENT_THEMES, EVENTS_LEDE } from "../data/meet2026";
import "./Events.css";

const Events = () => (
  <section className="bsm-page bsm-page--narrow">
    <h1 className="bsm-page-title">Events 2026</h1>
    <p className="bsm-page-lede">{EVENTS_LEDE}</p>

    <div className="bsm-event-groups">
      {EVENT_GROUPS.map((group) => (
        <div key={`${group.title}-${group.entries}`} className="bsm-card">
          <div className="bsm-event-group-head">
            <h2 className="bsm-event-group-title">{group.title}</h2>
            <span className="bsm-event-group-entries">{group.entries}</span>
          </div>
          <div className="bsm-event-items">
            {group.items.map((item) => (
              <div key={item} className="bsm-event-item">
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bsm-card bsm-card--dark">
        <h2 className="bsm-section-heading">Themes announced for 2026</h2>
        <div className="bsm-themes">
          {EVENT_THEMES.map((theme) => (
            <div key={theme.event} className="bsm-theme">
              <div className="bsm-theme-event">{theme.event}</div>
              <div className="bsm-theme-text">{theme.theme}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Events;
