import confetti from "canvas-confetti";

/** Brand palette (see styles/theme.css) so the burst matches the site. */
const COLORS = ["#f82249", "#0e1b4d", "#c9a227", "#8a94a6", "#ffffff"];

const BURSTS = 3;
const BURST_GAP_MS = 700;
const PARTICLE_COUNT = 80;
const SPREAD = 65;
const START_VELOCITY = 45;
const LEFT_CANNON = 0.15;
const RIGHT_CANNON = 0.85;
const ORIGIN_Y = 0.72;
/** Above the page, below the congratulation card (see WinnersCelebration.css). */
const CONFETTI_Z_INDEX = 1200;

const fireCannon = (originX) =>
  confetti({
    particleCount: PARTICLE_COUNT,
    spread: SPREAD,
    startVelocity: START_VELOCITY,
    origin: { x: originX, y: ORIGIN_Y },
    colors: COLORS,
    zIndex: CONFETTI_Z_INDEX,
    // canvas-confetti turns itself off for users who ask for less motion.
    disableForReducedMotion: true,
  });

/**
 * Fires a short two-cannon confetti salute.
 * Returns a cleanup function that cancels pending bursts and clears the canvas.
 */
export const fireCelebrationConfetti = () => {
  const timers = Array.from({ length: BURSTS }, (_, index) =>
    setTimeout(() => {
      fireCannon(LEFT_CANNON);
      fireCannon(RIGHT_CANNON);
    }, index * BURST_GAP_MS)
  );

  return () => {
    timers.forEach(clearTimeout);
    confetti.reset();
  };
};

/** Rank colours for the podium rain: gold, silver, bronze, each with the brand red. */
const RANK_COLORS = [
  ["#c9a227", "#f4d67a", "#ffffff", "#f82249"],
  ["#8a94a6", "#d7dced", "#ffffff", "#f82249"],
  ["#b06a3b", "#e0a878", "#ffffff", "#f82249"],
];

const RAIN_TICK_MS = 280;
/** A safety net: the rain tapers off on its own if a row is left open. */
const RAIN_MAX_MS = 9000;
const RAIN_PARTICLE_COUNT = 12;
const RAIN_SPREAD = 120;
const RAIN_START_VELOCITY = 14;
const RAIN_GRAVITY = 0.7;
const RAIN_TICKS = 260;
const RAIN_SCALAR = 0.9;
const RAIN_DRIFT = 0.6;
/** Just above the viewport, so the fall covers the full height of the page. */
const RAIN_ORIGIN_Y = -0.1;

const randomBetween = (min, max) => min + Math.random() * (max - min);

const dropOverPage = (colors) =>
  confetti({
    particleCount: RAIN_PARTICLE_COUNT,
    spread: RAIN_SPREAD,
    startVelocity: RAIN_START_VELOCITY,
    gravity: RAIN_GRAVITY,
    ticks: RAIN_TICKS,
    scalar: RAIN_SCALAR,
    drift: randomBetween(-RAIN_DRIFT, RAIN_DRIFT),
    origin: { x: Math.random(), y: RAIN_ORIGIN_Y },
    colors,
    zIndex: CONFETTI_Z_INDEX,
    disableForReducedMotion: true,
  });

/**
 * Rains confetti across the whole window while a podium deanery is open.
 * The returned stop function only stops feeding new confetti — whatever is
 * already in the air finishes its fall, so the celebration fades out gently
 * instead of being wiped off the screen.
 */
export const startConfettiRain = (rank = 0) => {
  const colors = RANK_COLORS[rank] ?? RANK_COLORS[RANK_COLORS.length - 1];

  dropOverPage(colors);
  const ticker = setInterval(() => dropOverPage(colors), RAIN_TICK_MS);
  const stop = () => clearInterval(ticker);
  const taper = setTimeout(stop, RAIN_MAX_MS);

  return () => {
    clearTimeout(taper);
    stop();
  };
};
