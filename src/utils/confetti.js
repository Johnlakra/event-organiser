/**
 * A small self-contained confetti canvas.
 *
 * Deliberately dependency-free: the deploy installs with `npm ci`, so keeping
 * package.json and package-lock.json untouched keeps the image build exactly
 * as it was. The canvas is created on demand, sits above the page without
 * catching clicks, and removes itself once the last piece has landed.
 */

const Z_INDEX = 1200;
const GRAVITY = 0.28;
const DRAG = 0.985;
const FLOOR_MARGIN = 60;
const PIECE_MIN = 6;
const PIECE_MAX = 11;
const TWO_PI = Math.PI * 2;

/** Brand palette (see styles/theme.css) so the confetti matches the site. */
const BRAND_COLORS = ["#f82249", "#0e1b4d", "#c9a227", "#8a94a6", "#ffffff"];

/** Gold, silver and bronze sets for the podium rain. */
const RANK_COLORS = [
  ["#c9a227", "#f4d67a", "#ffffff", "#f82249"],
  ["#8a94a6", "#d7dced", "#ffffff", "#f82249"],
  ["#b06a3b", "#e0a878", "#ffffff", "#f82249"],
];

const SALUTE_BURSTS = 3;
const SALUTE_GAP_MS = 700;
const SALUTE_PIECES = 70;
const SALUTE_SPEED = 13;
const SALUTE_SPREAD = 0.9;

const RAIN_TICK_MS = 280;
/** A safety net: the rain tapers off on its own if a row is left open. */
const RAIN_MAX_MS = 9000;
const RAIN_PIECES = 14;
const RAIN_SPEED = 2.4;

const noop = () => {};

const randomBetween = (min, max) => min + Math.random() * (max - min);

const pick = (items) => items[Math.floor(Math.random() * items.length)];

const prefersReducedMotion = () => {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    // matchMedia is missing in some test environments; assume motion is fine.
    return false;
  }
};

let canvas = null;
let context = null;
let frame = null;
let pieces = [];

const sizeCanvas = () => {
  if (!canvas) return;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
};

const teardown = () => {
  if (frame !== null) cancelAnimationFrame(frame);
  window.removeEventListener("resize", sizeCanvas);
  canvas?.remove();
  frame = null;
  canvas = null;
  context = null;
  pieces = [];
};

const ensureCanvas = () => {
  if (canvas) return true;

  const element = document.createElement("canvas");
  const ctx = element.getContext?.("2d");
  if (!ctx) return false;

  element.setAttribute("aria-hidden", "true");
  Object.assign(element.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: String(Z_INDEX),
  });
  document.body.appendChild(element);

  canvas = element;
  context = ctx;
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);
  return true;
};

const advance = (piece) => ({
  ...piece,
  x: piece.x + piece.vx,
  y: piece.y + piece.vy,
  vx: piece.vx * DRAG + piece.drift,
  vy: piece.vy * DRAG + GRAVITY,
  tilt: piece.tilt + piece.spin,
});

const isAirborne = (piece) => piece.y < window.innerHeight + FLOOR_MARGIN;

const paint = (piece) => {
  context.save();
  context.translate(piece.x, piece.y);
  context.rotate(piece.tilt);
  context.fillStyle = piece.color;
  context.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
  context.restore();
};

const tick = () => {
  pieces = pieces.map(advance).filter(isAirborne);
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  pieces.forEach(paint);

  if (pieces.length === 0) {
    teardown();
    return;
  }
  frame = requestAnimationFrame(tick);
};

const release = (newPieces) => {
  if (newPieces.length === 0 || !ensureCanvas()) return;

  pieces = [...pieces, ...newPieces];
  if (frame === null) frame = requestAnimationFrame(tick);
};

const makePiece = ({ x, y, angle, speed, colors }) => ({
  x,
  y,
  vx: Math.cos(angle) * speed,
  vy: Math.sin(angle) * speed,
  drift: randomBetween(-0.06, 0.06),
  tilt: randomBetween(0, TWO_PI),
  spin: randomBetween(-0.2, 0.2),
  size: randomBetween(PIECE_MIN, PIECE_MAX),
  color: pick(colors),
});

/** One cannon firing up and inwards from the lower corner it sits in. */
const fireCannon = (fromLeft) => {
  const x = window.innerWidth * (fromLeft ? 0.12 : 0.88);
  const y = window.innerHeight * 0.75;
  const aim = fromLeft ? -Math.PI / 3 : (-Math.PI * 2) / 3;

  release(
    Array.from({ length: SALUTE_PIECES }, () =>
      makePiece({
        x,
        y,
        angle: aim + randomBetween(-SALUTE_SPREAD, SALUTE_SPREAD) / 2,
        speed: randomBetween(SALUTE_SPEED * 0.6, SALUTE_SPEED),
        colors: BRAND_COLORS,
      })
    )
  );
};

/**
 * Fires a short two-cannon confetti salute.
 * Returns a cleanup function that cancels the bursts still to come.
 */
export const fireCelebrationConfetti = () => {
  if (prefersReducedMotion()) return noop;

  const timers = Array.from({ length: SALUTE_BURSTS }, (_, index) =>
    setTimeout(() => {
      fireCannon(true);
      fireCannon(false);
    }, index * SALUTE_GAP_MS)
  );

  return () => timers.forEach(clearTimeout);
};

/** A handful of pieces dropped in from just above the top of the window. */
const dropOverPage = (colors) =>
  release(
    Array.from({ length: RAIN_PIECES }, () =>
      makePiece({
        x: Math.random() * window.innerWidth,
        y: randomBetween(-80, -20),
        angle: Math.PI / 2 + randomBetween(-0.4, 0.4),
        speed: randomBetween(RAIN_SPEED * 0.5, RAIN_SPEED),
        colors,
      })
    )
  );

/**
 * Rains confetti across the whole window while a podium deanery is open.
 * The returned stop function only stops feeding new confetti — whatever is
 * already in the air finishes its fall, so the celebration fades out gently
 * instead of being wiped off the screen.
 */
export const startConfettiRain = (rank = 0) => {
  if (prefersReducedMotion()) return noop;

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
