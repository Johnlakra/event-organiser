import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="main-title">About BSMCSM 2024</h1>

      <section className="event-overview">
        <h2>Event Overview</h2>
        <p>
          The BP. Symphorian Memorial Cultural & Sports Meet (BSMCSM-2024) is an
          inter-deanery competition held from 12-14th September 2024 at Sacred
          Heart Convent School, BRS Nagar, Ludhiana.
        </p>
      </section>

      <section className="key-information">
        <h2>Key Information</h2>
        <ul>
          <li>Date: 12-14th September 2024</li>
          <li>Venue: Sacred Heart Convent School, BRS Nagar, Ludhiana</li>
          <li>Participants: Unmarried Catholic youth aged 15-30</li>
          <li>Registration Fee: Rs. 150/- per person</li>
        </ul>
      </section>

      <section className="general-rules">
        <h2>General Rules</h2>
        <ul>
          <li>
            Participants must have a valid CYD (Catholic Yuva Dhara) membership
            ID card
          </li>
          <li>
            Each participant can compete in up to three events (excluding
            Cultural procession, musical album making, and relay)
          </li>
          <li>
            Two entries for individual items and one entry for group items from
            each deanery
          </li>
          <li>Practice is not allowed during the program</li>
          <li>
            Participants should bring their own musical instruments, tools, and
            props
          </li>
        </ul>
      </section>

      <section className="scoring">
        <h2>Scoring and Awards</h2>
        <p>
          Event scoring: 1st position: 15 points, 2nd position: 10 points, 3rd
          position: 5 points
        </p>
        <p>Overall champions will be awarded:</p>
        <ul>
          <li>1st prize: Rs. 20,000/- & Trophy</li>
          <li>2nd prize: Rs. 12,000/- & Trophy</li>
          <li>3rd prize: Rs. 6,000/- & Trophy</li>
        </ul>
      </section>

      <section className="contact">
        <h2>Contact Information</h2>
        <p>For more information and registration, please contact:</p>
        <div className="contact-details">
          <p>
            <strong>Youth Commission</strong>
          </p>
          <p>Diocese of Jalandhar</p>
          <p>Bishop's House - Catholic Diocese Of Jalandhar,</p>
          <p>Jalandhar Cantt - Jandiala Rd,</p>
          <p>Near HP Petrol Pump, Namdev Chowk, Sehdev Market,</p>
          <p>Jalandhar, Punjab 144001</p>
          <p>
            Phone: <a href="tel:+917814749433">+91 78147 49433</a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:Icymjalandhar@gmail.com">Icymjalandhar@gmail.com</a>
          </p>
        </div>
      </section>

      <section className="about-icym">
        <h2>About ICYM</h2>
        <p>
          The Indian Catholic Youth Movement (ICYM) is a parochial youth
          movement under the aegis of the CCBI Commission for Youth. It focuses
          on animating holistic growth for all youth under the Latin rite
          parishes in India.
        </p>
      </section>
    </div>
  );
};

export default About;
