/**
 * BSMCSM 2026 timetable.
 * Transcribed from "BSMCSM 2026- TIMETABLE.pdf".
 *
 * `date` is dd/MM/yyyy so it can be compared directly against
 * toLocaleDateString("en-GB"), which is how the page picks today's tab.
 * Meal slots are flagged so the timeline can style them apart from events.
 */

export const MEET_TITLE = "BSMCSM 2026";
export const MEET_SUBTITLE =
  "Bp. Symphorian Memorial Cultural & Sports Meet";
export const MEET_VENUE =
  "Sacred Heart Sen. Sec. School, BRS Nagar, Ludhiana";
export const MEET_DATES = "10th – 12th September 2026";

export const MEET_NOTICE = {
  title: "Important Notice",
  label: "Musical Album",
  body: "Please send the Musical Album Making before 8th September 2026.",
};

export const MEAL_TIMES = [
  { name: "Breakfast", window: "08:30 – 09:30 am" },
  { name: "Lunch", window: "12:30 – 01:30 pm" },
  { name: "Tea", window: "04:00 – 05:00 pm" },
  { name: "Supper", window: "07:30 – 08:30 pm" },
];

const meal = (time, event) => ({ time, event, venue: "", type: "meal" });

export const SCHEDULE_2026 = [
  {
    date: "10/09/2026",
    label: "Day 1 · Thu 10 Sep",
    events: [
      { time: "03:00 pm", event: "Arrival & Registration", venue: "Church Gate" },
      meal("04:00 pm", "Tea"),
      { time: "06:00 pm", event: "1500 m Boys", venue: "Ground" },
      { time: "07:00 pm", event: "Rosary & Instructions", venue: "Stage 1" },
      meal("07:30 pm", "Supper"),
      { time: "08:30 pm", event: "Diocese Got Talent", venue: "Stage 1" },
      { time: "08:30 pm", event: "Essay Writing", venue: "Stage 5 – Class X Violet" },
    ],
  },
  {
    date: "11/09/2026",
    label: "Day 2 · Fri 11 Sep",
    events: [
      { time: "05:30 am", event: "Rising", venue: "" },
      { time: "06:30 am", event: "Rosary", venue: "Church" },
      { time: "07:00 am", event: "Holy Mass", venue: "Church" },
      { time: "08:00 am", event: "Inauguration & Cultural Procession", venue: "Ground" },
      meal("08:30 am", "Breakfast"),
      { time: "09:00 am", event: "100 m (heats) Boys & Girls", venue: "Ground" },
      { time: "09:00 am", event: "Basket Ball – Boys", venue: "Ground" },
      { time: "09:00 am", event: "Basket Ball – Girls", venue: "Ground" },
      { time: "09:00 am", event: "Mobile Photography (till 12:00 noon)", venue: "Stage 1" },
      { time: "09:30 am", event: "400 m (heats) Boys & Girls", venue: "Ground" },
      { time: "09:30 am", event: "Classical Solo Dance", venue: "Stage 2" },
      { time: "10:00 am", event: "200 m (heats) Boys & Girls", venue: "Ground" },
      { time: "10:00 am", event: "Kho-Kho – Girls", venue: "Ground" },
      { time: "10:00 am", event: "Face Painting", venue: "Stage 6 – Class IX Violet" },
      { time: "10:30 am", event: "800 m (heats) Girls & Boys", venue: "Ground" },
      { time: "10:30 am", event: "Fancy Dress", venue: "Stage 3" },
      { time: "11:30 am", event: "Volley Ball – Boys", venue: "Ground" },
      { time: "12:00 pm", event: "Long Jump Boys & Girls", venue: "Ground" },
      meal("12:30 pm", "Lunch"),
      { time: "02:00 pm", event: "Discus Throw Boys & Girls", venue: "Ground" },
      { time: "02:30 pm", event: "Silent Play", venue: "Stage 2" },
      { time: "03:00 pm", event: "Javelin Throw Boys & Girls", venue: "Ground" },
      { time: "03:00 pm", event: "Extempore", venue: "Stage 3" },
      { time: "03:00 pm", event: "Musical Album Making", venue: "Stage 6 – Class IX Violet" },
      { time: "03:30 pm", event: "Pencil Drawing", venue: "Stage 4 – Class X Red" },
      { time: "04:00 pm", event: "Shot Put Boys & Girls", venue: "Ground" },
      meal("04:00 pm", "Tea"),
      { time: "05:00 pm", event: "800 m Boys & Girls final", venue: "Ground" },
      { time: "06:30 pm", event: "Choreography", venue: "Stage 1" },
      meal("07:30 pm", "Supper"),
      { time: "08:30 pm", event: "Bhangra", venue: "Stage 1" },
      { time: "08:30 pm", event: "Poem Writing", venue: "Stage 5 – Class X Violet" },
      { time: "10:00 pm", event: "Night Prayer", venue: "Stage 1" },
    ],
  },
  {
    date: "12/09/2026",
    label: "Day 3 · Sat 12 Sep",
    events: [
      { time: "05:30 am", event: "5000 m Boys", venue: "Ground" },
      { time: "06:30 am", event: "Rosary", venue: "Church" },
      { time: "07:00 am", event: "Holy Mass", venue: "Church" },
      { time: "08:30 am", event: "Relay 4×100 Boys (I Round)", venue: "Ground" },
      meal("08:30 am", "Breakfast"),
      { time: "09:00 am", event: "Relay 4×100 Girls (I Round)", venue: "Ground" },
      { time: "09:00 am", event: "Group Song (Indian)", venue: "Stage 2" },
      { time: "09:00 am", event: "Mono Act", venue: "Stage 3" },
      { time: "09:30 am", event: "100 m Boys & Girls final", venue: "Ground" },
      { time: "09:30 am", event: "Volley Ball Boys final", venue: "Ground" },
      { time: "09:30 am", event: "Basket Ball Girls final", venue: "Ground" },
      { time: "10:00 am", event: "400 m Boys & Girls final", venue: "Ground" },
      { time: "10:30 am", event: "200 m Boys & Girls final", venue: "Ground" },
      { time: "11:00 am", event: "Relay 4×100 Boys & Girls (Final)", venue: "Ground" },
      { time: "11:30 am", event: "Basket Ball Boys final", venue: "Ground" },
      { time: "12:30 pm", event: "Concluding Ceremony & Victory March", venue: "Stage 1" },
      meal("12:30 pm", "Lunch"),
    ],
  },
];
