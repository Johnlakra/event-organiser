import React, { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import "./LeaderboardForm.css";

const LeaderboardForm = () => {
  const [formData, setFormData] = useState({});
  const [expandedEvent, setExpandedEvent] = useState(null);

  const handlePositionChange = (event, position, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [event]: {
        ...prevData[event],
        [position]: {
          ...prevData[event]?.[position],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2));
    alert("Leaderboard data submitted successfully!");
  };

  const toggleEvent = (event) => {
    setExpandedEvent(expandedEvent === event ? null : event);
  };

  const isEventComplete = (event) => {
    return ["I", "II", "III"].every(
      (position) =>
        formData[event]?.[position]?.deanery &&
        formData[event]?.[position]?.parish
    );
  };

  return (
    <div className="leaderboard-form-container">
      <h1 className="leaderboard-form-title">Leaderboard Entry Form</h1>
      <form onSubmit={handleSubmit}>
        {events.map((event, eventIndex) => (
          <div key={event} className="event-item">
            <button
              type="button"
              className="event-header"
              onClick={() => toggleEvent(event)}
            >
              <span>{`${eventIndex + 1}. ${event}`}</span>
              <div className="event-status">
                {isEventComplete(event) && (
                  <Check size={20} className="check-icon" />
                )}
                {expandedEvent === event ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </button>
            {expandedEvent === event && (
              <div className="event-details">
                {["I", "II", "III"].map((position) => (
                  <div key={position} className="position-item">
                    <h4 className="position-title">Position {position}</h4>
                    <select
                      onChange={(e) =>
                        handlePositionChange(
                          event,
                          position,
                          "deanery",
                          e.target.value
                        )
                      }
                      value={formData[event]?.[position]?.deanery || ""}
                      className="select-input"
                    >
                      <option value="">Select Deanery</option>
                      {Object.keys(deaneries).map((deanery) => (
                        <option key={deanery} value={deanery}>
                          {deanery}
                        </option>
                      ))}
                    </select>
                    {formData[event]?.[position]?.deanery && (
                      <select
                        onChange={(e) =>
                          handlePositionChange(
                            event,
                            position,
                            "parish",
                            e.target.value
                          )
                        }
                        value={formData[event]?.[position]?.parish || ""}
                        className="select-input"
                      >
                        <option value="">Select Parish</option>
                        {deaneries[formData[event][position].deanery].map(
                          (parish) => (
                            <option key={parish} value={parish}>
                              {parish}
                            </option>
                          )
                        )}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button type="submit" className="submit-button">
          Submit Leaderboard
        </button>
      </form>
    </div>
  );
};

export default LeaderboardForm;

const deaneries = {
  Ajnala: [
    "Ajnala ",
    "Chamiyari",
    "Chogawan",
    "Chuchakwal",
    "Karyal",
    "Othian",
    "Punga",
    "Ramdas",
  ],
  Amritsar: [
    "Amritsar Cantt.",
    "Bharariwal",
    "Gumtala",
    "Khasa",
    "Lahorigate",
    "Majitha Road",
    "Nai Abadi",
    "Rajasansi",
  ],
  Dhariwal: [
    "Batala",
    "Dhariwal",
    "Dialgarh",
    "Kalanaur",
    "Mastkot",
    "Naushera Majja Singh",
    "Qadian",
  ],
  "Fatehgarh Churian": [
    "Fatehgarh Churian",
    "Dera Baba Nanak",
    "Dharamkot Randhawa",
    "Ghanie Ke Banger",
    "Kotli",
    "Machi Nangal",
    "Majitha",
    "Pakharpura",
  ],
  Ferozpur: [
    "Faridkot",
    "Ferozepur Badhni Mahafariste Wala",
    "Ferozpur Canal Colony",
    "Ferozpur Cantt",
    "Ferozpur City",
    "Gulami Wala",
    "Guru Har Sahai",
    "Lohgarh-Sur Singh Wala (Station)",
    "Mamdot",
    "Mudki (Station)",
    "Sadiq",
    "Talwandi Bhai",
    "Tehna, Faridkot",
  ],
  Gurdaspur: [
    "Balun (Station)",
    "Dalhousie",
    "Dina Nagar",
    "Dorangala",
    "Gurdaspur",
    "Jandwal, Pathankot",
    "Kahnuwan",
    "Narot Jaimal Singh (Station)",
    "Pathankot City",
    "Puranashalla",
    "Sidhwan Jamita, Joura Chitra",
    "Sujanpur, Pathankot",
  ],
  Hoshiarpur: [
    "Kakkon",
    "Baijnath",
    "Balachaur",
    "Bassi Bahian",
    "Bhunga",
    "Gaggal",
    "Garshankar",
    "Jindwari",
    "Mehtiana, Khanaura",
    "Nandachaur",
    "Nangal",
    "Palampur",
    "Una",
    "Yol Camp",
  ],
  "Jalandhar Cantt.": [
    "Apra",
    "Banga (Station)",
    "Behram (Station)",
    "Dhina-Chittewani",
    "Jalandhar Cantt",
    "Jandiala Manjki",
    "Nawanshahar",
    "Phagwara",
    "Phulriwal",
    "Rawalpindi",
    "Sansarpur",
  ],
  "Jalandhar City": [
    "Adampur",
    "Bootan",
    "Chogitty",
    "Gakhalan",
    "Jalandhar City",
    "Lambapind",
    "Maqsudan",
  ],
  Kapurthala: [
    "Hussainpur- Lodhi Bhulana",
    "Kapurthala",
    "Kishangarh",
    "Kartarpur",
    "Mehatpur",
    "Nakodar",
    "Shahkot",
    "Sultanpur Lodhi",
  ],
  Ludhiana: [
    "BRS Nagar",
    "Jagraon",
    "Jalandhar Bypass, Ludhiana",
    "Kidwai Nagar",
    "Phillaur",
    "Raekot",
    "Sarabha Nagar",
  ],
  Moga: [
    "Baghapurana",
    "Buggipura, Moga (Station)",
    "Buttar, Moga (Station)",
    "Dharamkot, Moga",
    "Kot-Ise-Khan, Moga (Station)",
    "Makhu",
    "Moga",
    "Nihal Singh Wala, Moga (Station)",
    "Singhanwala, Moga",
    "Zira",
  ],
  Muktsar: [
    "Abohar",
    "Bhagsar",
    "Danewala",
    "Fazilka",
    "Gidderbaha (Station)",
    "Jaiton",
    "Jalalabad",
    "Kotkapura",
    "Malout Pind",
    "Malout",
    "Muktsar, Bir Sarkar",
    "Muktsar",
    "Panjgaraian (Station)",
    "Sikhwala",
  ],
  Sahnewal: [
    "Bhammian Kalan (Station)",
    "Jamalpur",
    "Khanna",
    "Khanpur-Jassar-Sangowal-Rania",
    "Machhiwara",
    "Machian Khurd",
    "Sahnewal",
    "Samrala",
  ],
  Tanda: [
    "Bhogpur",
    "Bholath",
    "Dasuya",
    "Mukerian",
    "Tanda",
    "Sri Hargobindpur",
  ],
  "Tarn Taran": [
    "Akalgarh (Station)",
    "Beas",
    "Bhikhiwind",
    "Bhojian",
    "Chabhal (Station)",
    "Fatehabad (Station)",
    "Harike",
    "Jandiala Guru",
    "Khem Karan",
    "Patti",
    "Tarn Taran",
  ],
};

const events = [
  "100m Boys",
  "100m Girls",
  "200m Boys",
  "200m Girls",
  "400m Boys",
  "400m Girls",
  "800m Boys",
  "800m Girls",
  "1500m Boys",
  "5000m Boys",
  "4x100m Relay Boys",
  "4x100m Relay Girls",
  "Long Jump Boys",
  "Long Jump Girls",
  "High Jump Boys",
  "High Jump Girls",
  "Shot Put Boys",
  "Shot Put Girls",
  "Discus Throw Boys",
  "Discus Throw Girls",
  "Javelin Throw Boys",
  "Javelin Throw Girls",
  "Basketball Boys",
  "Basketball Girls",
  "Volleyball Boys",
  "Kho-Kho Girls",
  "Group Song (Indian)",
  "Musical Album",
  "Classical Solo Dance",
  "Bhangra",
  "Essay Writing",
  "Poem Writing",
  "Extempore",
  "Pencil Drawing",
  "Water Color Painting",
  "Mobile Photography",
  "Mimicry",
  "Mono Act",
  "Bible Skit",
  "Fancy Dress",
  "Tableau",
  "Cultural Procession",
];
