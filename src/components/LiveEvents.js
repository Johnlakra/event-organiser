import React from "react";
import "./LiveEvents.css";

const hasText = (value) => Boolean(value?.trim());

/**
 * One compact card per *active* stage. Idle stages are skipped entirely
 * rather than rendered as empty placeholders.
 */
const LiveEvents = ({ events = [] }) => {
  const active = events.filter((event) => hasText(event.current_event));

  if (active.length === 0) {
    return (
      <section className="live-events">
        <p className="live-none">No stage is live right now.</p>
      </section>
    );
  }

  return (
    <section className="live-events">
      <div className="live-grid">
        {active.map((event) => {
          const nextEvent = event.next_event?.trim();

          return (
            <article key={event.id} className="stage-card">
              <div className="stage-card-head">
                <span className="stage-name">{event.stage_name}</span>
                {Boolean(event.live) && (
                  <span className="stage-live">
                    <span className="stage-live-dot" aria-hidden="true" />
                    LIVE
                  </span>
                )}
              </div>

              <p className="stage-current">{event.current_event.trim()}</p>

              {hasText(nextEvent) && (
                <p className="stage-next">Next · {nextEvent}</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default LiveEvents;
