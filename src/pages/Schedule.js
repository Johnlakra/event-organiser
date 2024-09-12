import React, { useState, useEffect } from "react";
import "./Schedule.css";

const Schedule = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const schedule = [
    {
      date: "12/09/2024",
      events: [
        {
          time: "05:00 pm",
          event: "Arrival & Registration",
          venue: "Church Gate",
        },
        { time: "06:00 pm", event: "Rosary", venue: "Church" },
        { time: "07:00 pm", event: "Musical Album", venue: "Stage 2" },
        { time: "08:30 pm", event: "Essay Writing", venue: "Stage 4" },
        { time: "08:30 pm", event: "Pencil Drawing", venue: "Stage 4" },
        { time: "08:30 pm", event: "Mimicry", venue: "Stage 1" },
        { time: "09:30 pm", event: "Instructions", venue: "Stage 1" },
        { time: "10:00 pm", event: "Good night", venue: "" },
      ],
    },
    {
      date: "13/09/2024",
      events: [
        { time: "05:30 am", event: "Rising", venue: "" },
        { time: "06:30 am", event: "Rosary", venue: "Church" },
        { time: "07:00 am", event: "Holy Mass", venue: "Church" },
        {
          time: "07:45 am",
          event: "Inauguration & Cultural procession",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "09:00 am",
          event: "100 m (heats) Boys & Girls",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "09:00 am",
          event: "Basket Ball Boys",
          venue: "Court No 1 (Ground)",
        },
        {
          time: "09:00 am",
          event: "Basket Ball Girls",
          venue: "Court No 2 (Ground)",
        },
        {
          time: "09:00 am",
          event: "Mobile Photography",
          venue: "Stage No 1 (Ground)",
        },
        { time: "09:30 am", event: "1500m Boys", venue: "Stage No 1 (Ground)" },
        { time: "09:30 am", event: "Bible Skit", venue: "Stage No 2" },
        { time: "09:30 am", event: "Mono act", venue: "Stage No 3" },
        {
          time: "09:30 am",
          event: "Water color painting",
          venue: "Stage No 4",
        },
        {
          time: "10:00 am",
          event: "200 m (heats) Boys & Girls",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "10:00 am",
          event: "Long Jump B's & G's",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "10:30 am",
          event: "800 Girls & Boys(heats)",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "11:00 am",
          event: "400m (heats) Boys & Girls",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "11:00 am",
          event: "High Jump Boys & Girls",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "12:00 pm",
          event: "Javelin Throw Boys & Girls",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "12:00 pm",
          event: "Discus Throw Boys & Girls",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "12:00 pm",
          event: "Shot put Boys & Girls",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "12:00 pm",
          event: "Volley Ball – Boys",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "12:00 pm",
          event: "Kho-Kho – Girls",
          venue: "Stage No 1 (Ground)",
        },
        { time: "02:00 pm", event: "Group song Indian", venue: "Stage No 2" },
        { time: "02:00 pm", event: "Fancy Dress", venue: "Stage No 3" },
        { time: "05:00 pm", event: "Poem writing", venue: "Stage No 4" },
        { time: "05:30 pm", event: "Bhangara", venue: "Stage No 2" },
        { time: "08:30 pm", event: "Tableau", venue: "Stage No 1 (Ground)" },
        { time: "09:30 pm", event: "Night prayer", venue: "" },
      ],
    },
    {
      date: "14/09/2024",
      events: [
        { time: "05:00 am", event: "5000m Boys", venue: "Stage No 1 (Ground)" },
        { time: "06:30 am", event: "Rosary", venue: "Church" },
        { time: "07:00 am", event: "Holy Mass", venue: "Church" },
        {
          time: "09:00 am",
          event: "100 m Boys & Girls final",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "09:00 am",
          event: "Basket Ball Boys & Girls final",
          venue: "Stage No 1 (Ground)",
        },
        { time: "09:00 am", event: "Extempore", venue: "Stage No 4" },
        {
          time: "09:30 am",
          event: "400m Boys & Girls final",
          venue: "Stage No 1",
        },
        { time: "09:30 am", event: "Group song Indian", venue: "Stage No 2" },
        {
          time: "10:00 am",
          event: "200 m Boys & Girls final",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "10:00 am",
          event: "Volley Ball – Boys final",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "10:00 am",
          event: "Kho-Kho – Girls final",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "10:00 am",
          event: "Classical solo dance",
          venue: "Stage No 3",
        },
        {
          time: "11:00 am",
          event: "800m Boys & Girls final",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "12:00 pm",
          event: "Relay 4×100 B's & G's",
          venue: "Stage No 1 (Ground)",
        },
        {
          time: "04:00 pm",
          event: "Concluding Ceremony & Victory March",
          venue: "Stage No 1 (Ground)",
        },
      ],
    },
  ];

  useEffect(() => {
    const updateCurrentEvents = () => {
      const now = new Date();
      const currentDate = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const currentTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const todaySchedule = schedule.find((day) => day.date === currentDate);
      if (todaySchedule) {
        setActiveTab(schedule.indexOf(todaySchedule));
        const ongoing = todaySchedule.events.filter((event) => {
          const [eventHour, eventMinute] = event.time.split(":");
          const eventTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            parseInt(eventHour),
            parseInt(eventMinute)
          );
          const eventEndTime = new Date(eventTime.getTime() + 60 * 60 * 1000); // Assume 1 hour duration
          return now >= eventTime && now < eventEndTime;
        });
        setCurrentEvents(ongoing);
      } else {
        setCurrentEvents([]);
      }
    };

    updateCurrentEvents();
    const intervalId = setInterval(updateCurrentEvents, 300000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="schedule">
      <h1 className="schedule-title">BSMCSM 2024 Schedule</h1>

      <div className="current-events-banner">
        {currentEvents.length > 0 ? (
          currentEvents.map((event, index) => (
            <div key={index} className="current-event">
              <span className="time">{event.time}</span>
              <span className="event-name">{event.event}</span>
              <span className="venue">{event.venue}</span>
            </div>
          ))
        ) : (
          <p> Ongoing events here</p>
        )}
      </div>

      <div className="tabs">
        {schedule.map((day, index) => (
          <button
            key={day.date}
            className={`tab ${index === activeTab ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {day.date}
          </button>
        ))}
      </div>

      <div className="timeline">
        {schedule[activeTab].events.map((event, eventIndex) => (
          <div key={eventIndex} className="timeline-event">
            <div className="timeline-point"></div>
            <div className="event-content">
              <span className="time">{event.time}</span>
              <span className="event-name">{event.event}</span>
              <span className="venue">{event.venue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
