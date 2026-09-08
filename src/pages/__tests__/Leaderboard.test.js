import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Leaderboard from "../Leaderboard";
import leaderBoardSlice from "../../redux/leaderBoard/leaderBoardSlice";
import dropdownSlice from "../../redux/dropdown/dropdownSlice";
import { api } from "../../service/api";

jest.mock("../../service/api");

const YEARS = [
  { id: 2, name: "2026", status: 1 },
  { id: 1, name: "2025", status: 0 },
];

const DEANERIES = [
  { id: 1, name: "Ludhiana" },
  { id: 2, name: "Muktsar" },
  { id: 3, name: "Amritsar" },
];

const RESULTS = {
  2025: [
    { id: 1, deanery: "Muktsar", parish: "Malout", event: "100 mts Boys", position: "1st", point: 15 },
    { id: 2, deanery: "Ludhiana", parish: "BRS Nagar", event: "Bhangra", position: "1st", point: 30 },
  ],
};

const makeStore = () =>
  configureStore({ reducer: { leaderBoardSlice, dropdownSlice } });

const renderPage = () =>
  render(
    <Provider store={makeStore()}>
      <Leaderboard />
    </Provider>
  );

beforeEach(() => {
  api.mockReset();
  api.mockImplementation((method, endpoint) => {
    if (endpoint === "dropdown")
      return Promise.resolve({ year: YEARS, deanery: DEANERIES });
    if (endpoint.startsWith("v2/leaderBoard")) return Promise.resolve(RESULTS);
    return Promise.resolve({});
  });
});

describe("Leaderboard year split", () => {
  test("reads the leaderboard from the v2 endpoint", async () => {
    renderPage();
    await waitFor(() =>
      expect(api).toHaveBeenCalledWith("GET", "v2/leaderBoard")
    );
  });

  test("labels the live year and the archive year on the tabs", async () => {
    renderPage();
    expect(await screen.findByRole("tab", { name: /2026 · Live/ })).toBeInTheDocument();
    expect(await screen.findByRole("tab", { name: /2025 · Archive/ })).toBeInTheDocument();
  });

  test("defaults to the live year and explains that scoring has not started", async () => {
    renderPage();
    expect(
      await screen.findByText(/Scoring for 2026 starts on 10 September/)
    ).toBeInTheDocument();
  });

  test("lists every deanery at zero before any 2026 result exists", async () => {
    renderPage();
    // All three deaneries appear, each with 0 pts and an em-dash rank.
    expect(await screen.findByText("Ludhiana")).toBeInTheDocument();
    expect(await screen.findByText("Muktsar")).toBeInTheDocument();
    expect(await screen.findByText("Amritsar")).toBeInTheDocument();
    expect(screen.getAllByText("0 pts")).toHaveLength(DEANERIES.length);
  });

  test("switching to the archive shows ranked results and a podium", async () => {
    renderPage();

    await userEvent.click(await screen.findByRole("tab", { name: /2025 · Archive/ }));

    // Ludhiana's 30 points outrank Muktsar's 15.
    expect(await screen.findByText("Champions")).toBeInTheDocument();
    expect(await screen.findByText("30 pts")).toBeInTheDocument();
    expect(await screen.findByText("15 pts")).toBeInTheDocument();
    expect(screen.getByText("Runners-up")).toBeInTheDocument();
  });

  test("expanding a deanery reveals its parish results", async () => {
    renderPage();

    await userEvent.click(await screen.findByRole("tab", { name: /2025 · Archive/ }));
    const deaneryRows = await screen.findAllByText("Ludhiana");
    await userEvent.click(deaneryRows[deaneryRows.length - 1].closest("button"));

    expect(await screen.findByText("1. BRS Nagar")).toBeInTheDocument();
  });

  test("surfaces a failure instead of rendering an empty board", async () => {
    api.mockImplementation(() => Promise.reject(new Error("Network Error")));
    renderPage();
    expect(await screen.findByText(/Network Error/)).toBeInTheDocument();
  });
});
