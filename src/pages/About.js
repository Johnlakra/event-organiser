import React from "react";
import {
  ABOUT_REF,
  KEY_INFO,
  GENERAL_RULES,
  POINTS,
  TIE_BREAKER,
  CONTACT,
} from "../data/meet2026";
import "./About.css";

const About = () => (
  <section className="bsm-page bsm-page--tight">
    <h1 className="bsm-page-title">About &amp; Rules</h1>
    <p className="bsm-page-lede">{ABOUT_REF}</p>

    <div className="bsm-card bsm-about-block">
      <h2 className="bsm-section-heading">Key information</h2>
      <div className="bsm-key-info">
        {KEY_INFO.map((info) => (
          <div key={info.label}>
            <div className="bsm-label bsm-key-info-label">{info.label}</div>
            <div className="bsm-key-info-value">{info.value}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="bsm-card bsm-about-block">
      <h2 className="bsm-section-heading">General rules</h2>
      <ol className="bsm-rules">
        {GENERAL_RULES.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ol>
    </div>

    <div className="bsm-card bsm-about-block">
      <h2 className="bsm-section-heading">Points &amp; prizes</h2>
      <div className="bsm-points">
        {POINTS.map((block) => (
          <div key={block.label}>
            <div className="bsm-label bsm-points-label">{block.label}</div>
            <div className="bsm-points-lines">
              {block.lines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="bsm-tie-breaker">{TIE_BREAKER}</p>
    </div>

    <div className="bsm-card bsm-card--dark">
      <h2 className="bsm-section-heading">Contact</h2>
      <p className="bsm-contact-name">{CONTACT.name}</p>
      <p className="bsm-contact-address">{CONTACT.address}</p>
      <p className="bsm-contact-line">
        Phone <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> · Email{" "}
        <a href={CONTACT.emailHref}>{CONTACT.email}</a>
      </p>
      <p className="bsm-contact-director">{CONTACT.director}</p>
    </div>
  </section>
);

export default About;
