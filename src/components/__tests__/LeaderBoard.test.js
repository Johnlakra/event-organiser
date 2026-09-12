import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LeaderBoard from "../LeaderBoard";
import { startConfettiRain } from "../../utils/confetti";

jest.mock("../../utils/confetti", () => ({
  startConfettiRain: jest.fn(),
}));

const event = (id, points, parish = "St. Mary") => ({
  id,
  name: `Event ${id}`,
  position: "1st",
  points,
  parish,
});

const BOARD = [
  { id: "d-0", name: "Ludhiana", events: [event(1, 45)] },
  { id: "d-1", name: "Muktsar", events: [event(2, 30)] },
  { id: "d-2", name: "Amritsar", events: [event(3, 20)] },
  { id: "d-3", name: "Jalandhar", events: [event(4, 5)] },
];

let stopRain;

beforeEach(() => {
  // CRA resets mocks between tests, so the stop handle is re-installed here.
  stopRain = jest.fn();
  startConfettiRain.mockImplementation(() => stopRain);
});

const openDeanery = (name) =>
  userEvent.click(screen.getByText(name).closest("button"));

test("showers the page when a podium deanery is opened", async () => {
  render(<LeaderBoard data={BOARD} celebrateTopThree />);

  await openDeanery("Ludhiana");

  expect(startConfettiRain).toHaveBeenCalledWith(0);
});

test("uses the rank of the deanery that was opened", async () => {
  render(<LeaderBoard data={BOARD} celebrateTopThree />);

  await openDeanery("Amritsar");

  expect(startConfettiRain).toHaveBeenCalledWith(2);
});

test("leaves the rest of the board unceremonious", async () => {
  render(<LeaderBoard data={BOARD} celebrateTopThree />);

  await openDeanery("Jalandhar");

  expect(startConfettiRain).not.toHaveBeenCalled();
});

test("stops the shower when another deanery is opened", async () => {
  render(<LeaderBoard data={BOARD} celebrateTopThree />);

  await openDeanery("Ludhiana");
  await openDeanery("Jalandhar");

  expect(stopRain).toHaveBeenCalledTimes(1);
  expect(startConfettiRain).toHaveBeenCalledTimes(1);
});

test("stops the shower when the podium deanery is closed again", async () => {
  render(<LeaderBoard data={BOARD} celebrateTopThree />);

  await openDeanery("Ludhiana");
  await openDeanery("Ludhiana");

  expect(stopRain).toHaveBeenCalledTimes(1);
});

test("does not celebrate a deanery that has not scored yet", async () => {
  render(
    <LeaderBoard
      data={[{ id: "empty-1", name: "Ludhiana", events: [] }]}
      celebrateTopThree
    />
  );

  await openDeanery("Ludhiana");

  expect(await screen.findByText("No results recorded yet.")).toBeInTheDocument();
  expect(startConfettiRain).not.toHaveBeenCalled();
});

test("keeps past editions quiet, podium row or not", async () => {
  render(<LeaderBoard data={BOARD} />);

  await openDeanery("Ludhiana");

  expect(startConfettiRain).not.toHaveBeenCalled();
});
