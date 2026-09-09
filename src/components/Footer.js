import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="bsm-footer">
    <div className="bsm-shell bsm-footer-inner">
      <div>
        <p className="bsm-footer-brand">BSMCSM 2026</p>
        <p className="bsm-footer-org">
          Organised by the Youth Commission
          <br />
          <a
            className="bsm-footer-link"
            href="https://jalandhardiocese.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Diocese of Jalandhar
          </a>
        </p>
      </div>
      <div className="bsm-footer-right">
        <p className="bsm-footer-copy">© 2026 BSMCSM. All rights reserved.</p>
        <p className="bsm-footer-powered">
          Powered by{" "}
          <a
            className="bsm-footer-link"
            href="https://www.softechsmartsolutions.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Softech Smart Solutions
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
