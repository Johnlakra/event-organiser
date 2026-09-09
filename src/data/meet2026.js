/**
 * BSMCSM 2026 content.
 * Copy and structure come from the "Website redesign for 2026" design canvas;
 * the schedule lives separately in ./schedule2026.js and follows the
 * official timetable PDF, not the design's provisional draft.
 */

export const MEET = {
  shortName: "BSMCSM 2026",
  title: "Bp.  Memorial Cultural & Sports Meet",
  edition: "5th Diocesan Meet · Inter-Deanery",
  window: "10 September, 3:00 pm — 12 September, 2:00 pm 2026",
  venue: "Sacred Heart Convent School, BRS Nagar, Ludhiana",
  organiser: "Organised by the Youth Commission, Diocese of Jalandhar",
  scripture: {
    text: "“You also are witnesses, because you have been with me.”",
    reference: "Jn 15:27",
  },
  // IST; used for the home-page countdown.
  startsAt: "2026-09-10T15:00:00+05:30",
  endsAt: "2026-09-12T14:00:00+05:30",
};

export const HOME_NOTICE =
  "Registration closed on 31 August 2026. Every participant must wear a valid CYD membership ID card — no entry to the venue without it. All participants must arrive on 10 September; later entry will not be allowed.";

export const HOME_STATS = [
  { value: "17", label: "Deaneries" },
  { value: "26", label: "Events" },
  { value: "3", label: "Days" },
  { value: "5th", label: "Diocesan meet" },
];

export const EVENT_GROUPS = [
  {
    title: "Athletics — Boys",
    entries: "Two entries per deanery",
    items: ["100 m", "200 m", "400 m", "800 m", "1500 m", "5000 m", "Long Jump", "Shotput", "Discus Throw", "Javelin Throw"],
  },
  {
    title: "Athletics — Girls",
    entries: "Two entries per deanery",
    items: ["100 m", "200 m", "400 m", "800 m", "Long Jump", "Shotput", "Discus Throw", "Javelin Throw"],
  },
  {
    title: "Sports — Group items",
    entries: "One entry per deanery",
    items: ["4×100 m Relay (Boys)", "4×100 m Relay (Girls)", "Basketball (Boys)", "Basketball (Girls)", "Volleyball (Boys)", "Kho-Kho (Girls)"],
  },
  {
    title: "Cultural — Individual",
    entries: "Two entries per deanery",
    items: ["Mobile Photography", "Poem Writing", "Essay Writing", "Pencil Drawing", "Diocese Got Talent", "Fancy Dress"],
  },
  {
    title: "Cultural — Individual",
    entries: "One entry per deanery",
    items: ["Mono Act", "Extempore", "Classical Solo Dance", "Face Painting"],
  },
  {
    title: "Cultural — Group items",
    entries: "One entry per deanery",
    items: ["Cultural Procession", "Choreography", "Silent Play", "Musical Album Making", "Group Singing", "Bhangra"],
  },
];

export const EVENT_THEMES = [
  { event: "Cultural Procession", theme: "Church — 800th anniversary of St. Francis of Assisi" },
  { event: "Choreography", theme: "Youth — Rising through the storm" },
  { event: "Silent Play", theme: "Youth — The Phoenix of Hope" },
  { event: "Musical Album Making", theme: "Life of St. Francis of Assisi" },
  { event: "Group Singing", theme: "Youth — Echoes of the Hope" },
  { event: "Fancy Dress", theme: "Rich Culture of India" },
];

export const EVENTS_LEDE =
  "One participant may enter a maximum of three events across sports and culture — excluding Cultural Procession, Musical Album Making and Relay.";

export const ABOUT_REF = "Ref. No. CYD/04/26 · 11 July 2026 · Youth Commission, Diocese of Jalandhar";

export const KEY_INFO = [
  { label: "Dates", value: "10 Sep (3:00 pm) — 12 Sep (2:00 pm) 2026" },
  { label: "Venue", value: "Sacred Heart Convent School, BRS Nagar, Ludhiana" },
  { label: "Format", value: "Inter-deanery competition" },
  { label: "Eligibility", value: "Unmarried Catholic youth, ages 14–30" },
  { label: "Registration fee", value: "Rs. 150 per person" },
  { label: "Entries closed", value: "31 August 2026" },
];

export const GENERAL_RULES = [
  "Only unmarried Catholic youth aged between 14 and 30 may participate. Anyone found below 14, above 30 or married will be disqualified along with the parish participants.",
  "Participants must carry a valid Catholic Yuva Dhara membership ID card and wear it at all times; without it entry to the venue is not allowed.",
  "One participant may take part in a maximum of three events across sports and culture, excluding Cultural Procession, Musical Album Making and Relay.",
  "Two entries per deanery for individual items (boys and girls separately for sports) and one entry per deanery for group items.",
  "Practice is not allowed during the programme.",
  "Damage to the school building or misbehaviour of any sort disqualifies the participant and the parish youth from all events, and 30 points are deducted from the deanery.",
  "Youth under medication are not allowed to participate. A maximum of four lay animators per deanery may accompany the participants.",
  "Cultural Procession is held immediately after the Holy Mass on 11 September. Participants should bring bed sheets, toilet requisites and their own musical instruments, tools and props.",
];

export const POINTS = [
  { label: "Individual events", lines: ["1st — 15 points", "2nd — 10 points", "3rd — 5 points"] },
  { label: "Group events", lines: ["1st — 30 points", "2nd — 25 points", "3rd — 20 points"] },
  { label: "Overall championship", lines: ["1st — Rs. 25,000 & Trophy", "2nd — Rs. 15,000 & Trophy", "3rd — Rs. 10,000 & Trophy"] },
];

export const TIE_BREAKER =
  "Tie-breaker: in the event of a tie for first, second or third place, the final ranking is decided by a tug-of-war between the tied teams. The decision of the organisers and judges is final.";

export const CONTACT = {
  name: "Youth Commission, Diocese of Jalandhar",
  address: "Bishop’s House, Civil Lines, Jalandhar City, Punjab 144001",
  phone: "+91 78147 49433",
  phoneHref: "tel:+917814749433",
  email: "Icymjalandhar@gmail.com",
  emailHref: "mailto:Icymjalandhar@gmail.com",
  director: "Fr. Jibin Kumbalathan, Youth Director",
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/schedule", label: "Schedule" },
  { to: "/about", label: "About" },
  { to: "/admin", label: "Admin" },
];
