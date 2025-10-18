import React from 'react';

const footerStyle = {
  background: '#101522',
  color: '#eee',
  fontSize: '14px',
  padding: '20px 0',
};

const containerStyle = {
  maxWidth: '1140px',
  margin: '0 auto',
  padding: '0 15px',
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '10px' }}>
            &copy; 2025 BSMCSM. All Rights Reserved
          </p>
          <p>
            Organized by the Youth Commission
          </p>
          <p>
          Diocese of Jalandhar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;