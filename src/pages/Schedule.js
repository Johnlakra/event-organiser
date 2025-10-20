import React, { useState, useEffect } from "react";
import "./Schedule.css";

const Schedule = () => {
  const [, setCurrentEvents] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const schedule = [
    {
      date: "20/10/2025",
      events: [
        { time: "03:00 pm", event: "Arrival & Registration", venue: "Church Gate" },
        { time: "05:00 pm", event: "1500m Boys", venue: "Ground" },
        { time: "06:00 pm", event: "Rosary & Instructions", venue: "Stage 1" },
        { time: "08:00 pm", event: "Bible Skit", venue: "Stage 2" },
        { time: "08:30 pm", event: "Essay Writing", venue: "Stage 5 (Class X Violet)" },
      ],
    },
    {
      date: "21/10/2025",
      events: [
        { time: "05:30 am", event: "Rising", venue: "" },
        { time: "06:30 am", event: "Rosary", venue: "Church" },
        { time: "07:00 am", event: "Holy Mass", venue: "Church" },
        { time: "08:00 am", event: "Inauguration & Cultural Procession", venue: "Ground" },
        { time: "08:30 am", event: "Breakfast", venue: "" },
        { time: "09:00 am", event: "100 m (heats) Boys & Girls", venue: "Ground" },
        { time: "09:00 am", event: "Basket Ball - Boys", venue: "Ground" },
        { time: "09:00 am", event: "Basket Ball - Girls", venue: "Ground" },
        { time: "09:00 am", event: "Mobile Photography", venue: "Stage 1" },
        { time: "09:30 am", event: "400m (heats) Boys & Girls", venue: "Ground" },
        { time: "09:30 am", event: "Classical Solo Dance", venue: "Stage 2" },
        { time: "09:30 am", event: "Water Color Painting", venue: "Stage 4 - Biolab" },
        { time: "10:00 am", event: "200 m (heats) Boys & Girls", venue: "Ground" },
        { time: "10:00 am", event: "Kho-Kho - Girls", venue: "Ground" },
        { time: "10:30 am", event: "800m (heats) Girls & Boys", venue: "Ground" },
        { time: "10:30 am", event: "Fancy Dress", venue: "Stage 3" },
        { time: "11:30 am", event: "Volley Ball - Boys", venue: "Ground" },
        { time: "12:00 pm", event: "Long Jump Boys & Girls", venue: "Ground" },
        { time: "12:30 pm", event: "Lunch", venue: "" },
        { time: "02:00 pm", event: "Discus Throw Boys & Girls", venue: "Ground" },
        { time: "02:00 pm", event: "Extempore", venue: "Stage 2" },
        { time: "02:30 pm", event: "Pencil Drawing", venue: "Stage 4 - Biolab" },
        { time: "03:00 pm", event: "Javelin Throw Boys & Girls", venue: "Ground" },
        { time: "04:00 pm", event: "Shot put Boys & Girls", venue: "Ground" },
        { time: "04:00 pm", event: "Tea", venue: "" },
        { time: "05:00 pm", event: "800m Boys & Girls final", venue: "Ground" },
        { time: "05:00 pm", event: "Mimicry", venue: "Stage 2" },
        { time: "05:30 pm", event: "Bhangra", venue: "Stage 1" },
        { time: "07:30 pm", event: "Supper", venue: "" },
        { time: "08:30 pm", event: "Tableau", venue: "Stage 1" },
        { time: "08:30 pm", event: "Poem Writing", venue: "Stage 5 (Class X Violet)" },
        { time: "09:30 pm", event: "Night Prayer", venue: "Stage 1" },
      ],
    },
    {
      date: "22/10/2025",
      events: [
        { time: "05:30 am", event: "5000 m Boys", venue: "Ground" },
        { time: "06:30 am", event: "Rosary", venue: "Church" },
        { time: "07:00 am", event: "Holy Mass", venue: "Church" },
        { time: "08:30 am", event: "Relay 4×100 boys (I Round)", venue: "Ground" },
        { time: "08:30 am", event: "Breakfast", venue: "" },
        { time: "09:00 am", event: "Relay 4×100 Girls (I Round)", venue: "Ground" },
        { time: "09:00 am", event: "Group song Indian", venue: "Stage 2" },
        { time: "09:00 am", event: "Mono Act", venue: "Stage 3" },
        { time: "09:30 am", event: "100 m Boys & Girls final", venue: "Ground" },
        { time: "09:30 am", event: "Volley Ball Boys final", venue: "Ground" },
        { time: "09:30 am", event: "Basket Ball Girls final", venue: "Ground" },
        { time: "10:00 am", event: "400m Boys & Girls final", venue: "Ground" },
        { time: "10:30 am", event: "200 m Boys & Girls final", venue: "Ground" },
        { time: "11:00 am", event: "Relay 4×100 Boys & Girls (Final)", venue: "Ground" },
        { time: "11:30 am", event: "Basket Ball Boys final", venue: "Ground" },
        { time: "12:30 pm", event: "Concluding Ceremony & Victory March", venue: "Stage 1" },
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

      const todaySchedule = schedule.find((day) => day.date === currentDate);
      if (todaySchedule) {
        setActiveTab(schedule.indexOf(todaySchedule));
        const ongoing = todaySchedule.events.filter((event) => {
          const timeStr = event.time.toLowerCase();
          const isPM = timeStr.includes("pm");
          const isAM = timeStr.includes("am");
          
          let [hours, minutes] = timeStr.replace(/[apm\s]/g, "").split(":");
          hours = parseInt(hours);
          minutes = parseInt(minutes);
          
          if (isPM && hours !== 12) hours += 12;
          if (isAM && hours === 12) hours = 0;
          
          const eventTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours,
            minutes
          );
          const eventEndTime = new Date(eventTime.getTime() + 60 * 60 * 1000);
          return now >= eventTime && now < eventEndTime;
        });
        setCurrentEvents(ongoing);
      } else {
        setCurrentEvents([]);
      }
    };

    updateCurrentEvents();
    const intervalId = setInterval(updateCurrentEvents, 60000);

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="schedule">
      <h1 className="schedule-title">BSMCSM 2025 Schedule</h1>

      <div className="current-events-banner">
        <h2 style={{ color: 'white' }}>Important Notice</h2>
        <div className="current-event">
          <span className="event-name">
            <strong>Musical Album:</strong> Please send the Musical Album Making before <strong>17th October 2025</strong>
          </span>
        </div>
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