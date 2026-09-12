const PREFIX = "bsm:seen:";

/**
 * "Once per visit" flags backed by sessionStorage, so a celebration plays on the
 * first landing and stays quiet when the user comes back to the page later in
 * the same tab. Storage can be unavailable (private mode, blocked cookies);
 * there the flag simply never sticks and the caller keeps working.
 */
export const hasSeen = (key) => {
  try {
    return window.sessionStorage.getItem(PREFIX + key) === "1";
  } catch {
    return false;
  }
};

export const markSeen = (key) => {
  try {
    window.sessionStorage.setItem(PREFIX + key, "1");
  } catch {
    /* storage unavailable — the flag is a nicety, not a requirement */
  }
};
