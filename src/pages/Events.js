import React from "react";
import "./Events.css";

const Events = () => {
  return (
    <div className="events-container">
      <h1 className="main-title">BSMCSM 2024 Events</h1>

      <section className="sports-events">
        <h2>Sports Events</h2>
        <h3>Track Events</h3>
        <ul>
          <li>100m (Boys & Girls)</li>
          <li>200m (Boys & Girls)</li>
          <li>400m (Boys & Girls)</li>
          <li>800m (Boys & Girls)</li>
          <li>1500m (Boys)</li>
          <li>5000m (Boys)</li>
          <li>4x100m Relay (Boys & Girls)</li>
        </ul>
        <h3>Field Events</h3>
        <ul>
          <li>Long Jump (Boys & Girls)</li>
          <li>High Jump (Boys & Girls)</li>
          <li>Shot Put (Boys & Girls)</li>
          <li>Discus Throw (Boys & Girls)</li>
          <li>Javelin Throw (Boys & Girls)</li>
        </ul>
        <h3>Team Sports</h3>
        <ul>
          <li>Basketball (Boys & Girls)</li>
          <li>Volleyball (Boys)</li>
          <li>Kho-Kho (Girls)</li>
        </ul>
      </section>

      <section className="cultural-events">
        <h2>Cultural Events</h2>
        <h3>Music</h3>
        <ul>
          <li>Group Song (Indian)</li>
          <li>Musical Album</li>
        </ul>
        <h3>Dance</h3>
        <ul>
          <li>Classical Solo Dance</li>
          <li>Bhangra</li>
        </ul>
        <h3>Literary</h3>
        <ul>
          <li>Essay Writing</li>
          <li>Poem Writing</li>
          <li>Extempore</li>
        </ul>
        <h3>Visual Arts</h3>
        <ul>
          <li>Pencil Drawing</li>
          <li>Water Color Painting</li>
          <li>Mobile Photography</li>
        </ul>
        <h3>Performing Arts</h3>
        <ul>
          <li>Mimicry</li>
          <li>Mono Act</li>
          <li>Bible Skit</li>
          <li>Fancy Dress</li>
          <li>Tableau</li>
        </ul>
      </section>

      <section className="special-events">
        <h2>Special Events</h2>
        <ul>
          <li>Inauguration & Cultural Procession</li>
          <li>Concluding Ceremony & Victory March</li>
        </ul>
      </section>

      <section className="event-schedule">
        <h2>Event Schedule</h2>
        <p>
          For detailed timings of each event, please refer to the Schedule page.
        </p>
      </section>

      <section className="participation-note">
        <h2>Note on Participation</h2>
        <p>
          Participants are reminded that they can compete in up to three events,
          excluding Cultural procession, musical album making, and relay. Please
          ensure you have registered for your chosen events.
        </p>
      </section>
    </div>
  );
};

export default Events;
