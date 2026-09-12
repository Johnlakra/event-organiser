import { useEffect } from "react";
import { fireCelebrationConfetti } from "../utils/confetti";
import { hasSeen, markSeen } from "../utils/sessionOnce";

/**
 * Salutes the leading deaneries with confetti on the first landing of a visit.
 * It fires once per visit per edition: arriving on the leaderboard sets it off,
 * coming back to the page later in the same tab stays quiet.
 */
export const useWinnersSalute = (winners = [], edition) => {
  useEffect(() => {
    if (!edition || winners.length === 0) return undefined;

    const key = `winners:${edition}`;
    if (hasSeen(key)) return undefined;

    markSeen(key);
    return fireCelebrationConfetti();
  }, [edition, winners]);
};

export default useWinnersSalute;
