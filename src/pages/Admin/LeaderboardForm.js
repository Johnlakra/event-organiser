import React, { useState } from 'react';

const deaneries = [
  'Ajnala', 'Amritsar', 'Dhariwal', 'Fatehgarh Churian', 'Ferozpur', 'Gurdaspur',
  'Hoshiarpur', 'Jalandhar Cantt.', 'Jalandhar City', 'Kapurthala', 'Ludhiana',
  'Moga', 'Muktsar', 'Sahnewal', 'Tanda', 'Tarn Taran'
];

const events = [
  '100m Boys', '100m Girls', '200m Boys', '200m Girls', '400m Boys', '400m Girls',
  '800m Boys', '800m Girls', '1500m Boys', '5000m Boys', '4x100m Relay Boys',
  '4x100m Relay Girls', 'Long Jump Boys', 'Long Jump Girls', 'High Jump Boys',
  'High Jump Girls', 'Shot Put Boys', 'Shot Put Girls', 'Discus Throw Boys',
  'Discus Throw Girls', 'Javelin Throw Boys', 'Javelin Throw Girls',
  'Basketball Boys', 'Basketball Girls', 'Volleyball Boys', 'Kho-Kho Girls',
  'Group Song (Indian)', 'Musical Album', 'Classical Solo Dance', 'Bhangra',
  'Essay Writing', 'Poem Writing', 'Extempore', 'Pencil Drawing',
  'Water Color Painting', 'Mobile Photography', 'Mimicry', 'Mono Act',
  'Bible Skit', 'Fancy Dress', 'Tableau'
];

const positions = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const pointsMap = { I: 15, II: 10, III: 5, IV: 3, V: 2, VI: 1 };

const LeaderboardForm = () => {
  const [leaderboard, setLeaderboard] = useState(
    deaneries.reduce((acc, deanery) => ({
      ...acc,
      [deanery]: events.reduce((eventAcc, event) => ({
        ...eventAcc,
        [event]: ''
      }), {})
    }), {})
  );

  const handlePositionChange = (deanery, event, position) => {
    setLeaderboard(prev => ({
      ...prev,
      [deanery]: {
        ...prev[deanery],
        [event]: position
      }
    }));
  };

  const calculateTotal = (deanery) => {
    return Object.values(leaderboard[deanery]).reduce((total, position) => {
      return total + (pointsMap[position] || 0);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = deaneries.map(deanery => ({
      name: deanery,
      total: calculateTotal(deanery),
      events: events.map(event => ({
        name: event,
        position: leaderboard[deanery][event],
        points: pointsMap[leaderboard[deanery][event]] || 0
      }))
    }));
    console.log(JSON.stringify(formattedData, null, 2));
    // Here you would typically send this data to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="leaderboard-form">
      <div className="points-legend">
        {positions.map(pos => (
          <span key={pos}>{pos}: {pointsMap[pos]} points</span>
        ))}
      </div>
      <div className="leaderboard-grid">
        <div className="events-column">
          <div className="header-cell">Events</div>
          {events.map(event => (
            <div key={event} className="event-cell">{event}</div>
          ))}
        </div>
        {deaneries.map(deanery => (
          <div key={deanery} className="deanery-column">
            <div className="header-cell">{deanery}</div>
            {events.map(event => (
              <div key={`${deanery}-${event}`} className="position-cell">
                <select
                  value={leaderboard[deanery][event]}
                  onChange={(e) => handlePositionChange(deanery, event, e.target.value)}
                >
                  <option value="">-</option>
                  {positions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="totals-row">
        <div className="total-label">Total Points:</div>
        {deaneries.map(deanery => (
          <div key={`${deanery}-total`} className="total-cell">
            {calculateTotal(deanery)}
          </div>
        ))}
      </div>
      <button type="submit">Submit Leaderboard</button>
    </form>
  );
};

export default LeaderboardForm;