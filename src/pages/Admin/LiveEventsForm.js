import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dropdownState } from "../../redux/dropdown/dropdownSlice";
import {
  addBatchStage,
  getLiveOnStageItems,
} from "../../redux/liveonstage/liveonstageSlice";
import toast from "react-hot-toast";

const LiveEventsForm = () => {
  const dispatch = useDispatch();
  const data = useSelector(dropdownState);
  const [liveEvents, setLiveEvents] = useState({});
  const [loading, setLoading] = useState(true); // State to track loading

  // Fetch live events data
  const fetchLiveOnStage = useCallback(async () => {
    try {
      setLoading(true); // Start loader
      const result = await dispatch(getLiveOnStageItems());
      if (result?.error) {
        // Handle error
        console.error("Error fetching live events:", result.error);
      } else {
        const liveEventData = result?.payload?.reduce((acc, event) => {
          acc[event.id] = event;
          return acc;
        }, {});
        setLiveEvents(liveEventData || {});
      }
    } catch (error) {
      console.error("Error fetching live events:", error);
      // Handle error
    } finally {
      setLoading(false); // Stop loader
    }
  }, [dispatch]);

  useEffect(() => {
    fetchLiveOnStage();
  }, [fetchLiveOnStage]);

  // Handle input changes
  const handleInputChange = (eventId, field, value) => {
    setLiveEvents((prev) => {
      return {
        ...prev,
        [eventId]: { ...prev[eventId], [field]: value },
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = Object.values(liveEvents);
    try {
      const result = await dispatch(addBatchStage(payload));
      if (result?.error) {
        toast.error(result?.error?.message);
      } else {
        toast.success(result?.payload?.success);
      }
    } catch (error) {
      console.error("Error submitting live events:", error);
      // Handle error
    }
  };

  // Conditionally render form only when loading is complete
  if (loading) {
    return <div>Loading...</div>; // Display loading message or spinner
  }

  return (
    <form onSubmit={handleSubmit} className="live-events-form">
      {Object.values(liveEvents).map((event) => (
        <div key={event.id} className="venue-form">
          <h3>{event.stage_name}</h3>
          <input
            type="text"
            placeholder="Current Event"
            value={event.current_event || ""}
            onChange={(e) =>
              handleInputChange(event.id, "current_event", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Next Event"
            value={event.next_event || ""}
            onChange={(e) =>
              handleInputChange(event.id, "next_event", e.target.value)
            }
          />
          <label>
            <input
              type="checkbox"
              checked={event.live === 1}
              onChange={(e) =>
                handleInputChange(event.id, "live", e.target.checked ? 1 : 0)
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
