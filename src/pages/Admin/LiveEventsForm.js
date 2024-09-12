import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dropdownState } from "../../redux/dropdown/dropdownSlice";
import { addBatchStage } from "../../redux/liveonstage/liveonstageSlice";

const LiveEventsForm = () => {
  const dispatch = useDispatch();
  const data = useSelector(dropdownState);
  const [render, setRender] = useState({
    stage: data.stage,
  });
  const [liveEvents, setLiveEvents] = useState();

  const handleInputChange = (venue, field, value) => {
    setLiveEvents((prev) => ({
      ...prev,
      [venue.id]: { ...prev[venue.id], [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // stage_id, current_event, next_event, live

    const payload = Object.values(liveEvents);
    try {
      // Loader here
      await dispatch(addBatchStage(payload));
    } catch (error) {
      // Show Error
    } finally {
      // Loader off
    }
  };

  // Optimize code here
  const fetchDropdowns = useCallback(async () => {
    const stage = data.stage;
    setRender((prev) => ({
      ...prev,
      stage,
    }));
  }, [data.stage]);

  useEffect(() => {
    setLiveEvents(
      data.stage?.reduce(
        (acc, venue) => ({
          ...acc,
          [venue.id]: {
            stage_id: venue.id,
            current_event: "",
            next_event: "",
            live: false,
          },
        }),
        {}
      )
    );
  }, [data.stage]);

  useEffect(() => {
    fetchDropdowns();
  }, [fetchDropdowns]);

  return (
    <form onSubmit={handleSubmit} className="live-events-form">
      {render.stage?.map((venue) => (
        <div key={venue.id} className="venue-form">
          <h3>{venue.name}</h3>
          <input
            type="text"
            placeholder="Current Event"
            value={liveEvents?.[venue.id]?.current_event}
            onChange={(e) =>
              handleInputChange(venue, "current_event", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Next Event"
            value={liveEvents?.[venue.id]?.next_event}
            onChange={(e) =>
              handleInputChange(venue, "next_event", e.target.value)
            }
          />
          <label>
            <input
              type="checkbox"
              checked={liveEvents?.[venue.id]?.live}
              onChange={(e) =>
                handleInputChange(venue, "live", e.target.checked)
              }
            />
            Live
          </label>
        </div>
      ))}
      <button type="submit">Submit Live Events</button>
    </form>
  );
};

export default LiveEventsForm;
