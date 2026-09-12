import React from "react";
import { render } from "@testing-library/react";
import { useWinnersSalute } from "../useWinnersSalute";
import { fireCelebrationConfetti } from "../../utils/confetti";

jest.mock("../../utils/confetti", () => ({
  fireCelebrationConfetti: jest.fn(),
}));

const WINNERS = [
  { name: "Fatehgarh Churian", points: 320, wins: 28 },
  { name: "Amritsar", points: 220, wins: 16 },
  { name: "Tarn Taran", points: 175, wins: 12 },
];

const Board = ({ winners, edition }) => {
  useWinnersSalute(winners, edition);
  return <div>board</div>;
};

beforeEach(() => {
  window.sessionStorage.clear();
  // CRA resets mocks between tests, so the cleanup stub is re-installed here.
  fireCelebrationConfetti.mockImplementation(() => jest.fn());
});

test("salutes the leaders on the first landing of a visit", () => {
  render(<Board winners={WINNERS} edition="2026" />);

  expect(fireCelebrationConfetti).toHaveBeenCalledTimes(1);
});

test("stays quiet on the second landing of the same visit", () => {
  const { unmount } = render(<Board winners={WINNERS} edition="2026" />);
  unmount();

  render(<Board winners={WINNERS} edition="2026" />);

  expect(fireCelebrationConfetti).toHaveBeenCalledTimes(1);
});

test("salutes a different edition on its own first landing", () => {
  const { unmount } = render(<Board winners={WINNERS} edition="2026" />);
  unmount();

  render(<Board winners={WINNERS} edition="2027" />);

  expect(fireCelebrationConfetti).toHaveBeenCalledTimes(2);
});

test("does nothing before any result is in", () => {
  render(<Board winners={[]} edition="2026" />);

  expect(fireCelebrationConfetti).not.toHaveBeenCalled();
});
