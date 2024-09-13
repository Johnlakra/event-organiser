import React, { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import "./LeaderboardForm.css";
import { useDispatch, useSelector } from "react-redux";
import { dropdownState } from "../../redux/dropdown/dropdownSlice";
import {
  addBatchBoardItem,
  getLeaderBoardItems,
} from "../../redux/leaderBoard/leaderBoardSlice";
import { toast } from "sonner";

const LeaderboardForm = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const data = useSelector(dropdownState);
  const [load, setLoad] = useState({ submit: false });
  const [render, setRender] = useState({
    events: data.events,
    places: data.places,
    denerary: data.denerary,
    parish: data.parish,
    leader_board: data.leader_board,
  });

  const handlePositionChange = (event, position, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [event]: {
        ...prevData[event],
        [position]: {
          ...prevData[event]?.[position],
          [field]: value,
          event,
          position,
          entry: true,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = Object.entries(formData).flatMap(([key, value]) => {
      return Object.entries(value)
        .map(([key, value]) => ({
          denerary_id: value.deanery,
          parish_id: value.parish,
          event_id: value.event,
          position_id: value.position,
          entry: value.entry,
        }))
        .filter((item) => item.entry);
    });
    try {
      setLoad((prev) => ({ ...prev, submit: true }));
      const result = await dispatch(addBatchBoardItem(payload));
      if (result?.error) {
        toast(result?.error?.message);
      } else {
        const board_items = await dispatch(getLeaderBoardItems());
        if (board_items?.error) {
        } else {
          await initialRender(board_items?.payload);
          toast(result?.payload?.success);
        }
      }
    } catch (error) {
      // Show Error
    } finally {
      setLoad((prev) => ({ ...prev, submit: false }));
    }
  };

  const renderPositions = (type) => {
    return render.places.filter((item) => item.type === type);
  };

  const toggleEvent = (event) =>
    setRender((prev) => {
      const events = prev.events.map((item) => {
        if (item.id === event.id)
          return { ...item, expandEvent: !item.expandEvent };
        return { ...item, expandEvent: false };
      });
      return { ...prev, events };
    });

  const isEventComplete = (type, event) => {
    return render.places
      ?.filter((item) => item.type === type)
      ?.map((item) => item.id)
      .every(
        (position) =>
          formData[event]?.[position]?.deanery &&
          formData[event]?.[position]?.parish
      );
  };

  const fetchDropdowns = useCallback(async () => {
    const places = data.places;
    const denerary = data.denerary;
    const parish = data.parish;
    const leader_board = data.leader_board;
    const events = data.events.map((item) => ({
      ...item,
      expandEvent: false,
    }));
    setRender((prev) => ({
      ...prev,
      events,
      places,
      denerary,
      parish,
      leader_board,
    }));
  }, [data.denerary, data.events, data.leader_board, data.parish, data.places]);

  useEffect(() => {
    fetchDropdowns();
  }, [fetchDropdowns]);

  const initialRender = useCallback((data = []) => {
    setFormData(
      data?.reduce((acc, item) => {
        const { event_id, position_id, denerary_id, parish_id } = item;
        const _ = {
          event: event_id,
          position: position_id,
          denerary: denerary_id,
          parish: parish_id,
        };
        return {
          ...acc,
          [_.event]: {
            ...acc[_.event],
            [_.position]: {
              ...acc[_.event]?.[_.position],
              event: _.event,
              position: _.position,
              deanery: _.denerary,
              parish: _.parish,
              entry: false,
            },
          },
        };
      }, {})
    );
  }, []);

  useEffect(() => {
    initialRender(render.leader_board);
  }, [initialRender, render.leader_board]);

  return (
    <div className="leaderboard-form-container">
      <h1 className="leaderboard-form-title">Leaderboard Entry Form</h1>
      <form onSubmit={handleSubmit}>
        {render.events.map((event, eventIndex) => {
          return (
            <div key={event.id} className="event-item">
              <button
                type="button"
                className="event-header"
                onClick={() => toggleEvent(event)}
              >
                <span>{`${eventIndex + 1}. ${event.name}`}</span>
                <div className="event-status">
                  {isEventComplete(event.type, event.id) && (
                    <Check size={20} className="check-icon" />
                  )}
                  {event.expandEvent ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </button>
              {event.expandEvent && (
                <div className="event-details">
                  {renderPositions(event.type).map((position) => {
                    return (
                      <div key={position.id} className="position-item">
                        <h4 className="position-title">
                          Position {position.name}
                        </h4>
                        <select
                          onChange={(e) =>
                            handlePositionChange(
                              event.id,
                              position.id,
                              "deanery",
                              e.target.value
                            )
                          }
                          value={
                            formData[event.id]?.[position.id]?.deanery || ""
                          }
                          className="select-input"
                        >
                          <option value="">Select Deanery</option>
                          {render.denerary?.map((deanery) => (
                            <option key={deanery.id} value={deanery.id}>
                              {deanery.name}
                            </option>
                          ))}
                        </select>
                        {formData[event.id]?.[position.id]?.deanery && (
                          <select
                            onChange={(e) =>
                              handlePositionChange(
                                event.id,
                                position.id,
                                "parish",
                                e.target.value
                              )
                            }
                            value={
                              formData[event.id]?.[position.id]?.parish || ""
                            }
                            className="select-input"
                          >
                            <option value="">Select Parish</option>
                            {render.parish
                              ?.filter(
                                (item) =>
                                  item.denerary_id ==
                                  formData[event.id]?.[position.id]?.deanery
                              )
                              ?.map((parish) => (
                                <option key={parish.id} value={parish.id}>
                                  {parish.name}
                                </option>
                              ))}
                          </select>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <button type="submit" className="submit-button">
          {load.submit ? "Submitting..." : "Submit Leaderboard"}
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
