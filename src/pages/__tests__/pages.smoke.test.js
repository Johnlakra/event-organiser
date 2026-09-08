import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Home from "../Home";
import Events from "../Events";
import About from "../About";
import Schedule from "../Schedule";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Admin from "../Admin/Admin";
import leaderBoardSlice from "../../redux/leaderBoard/leaderBoardSlice";
import dropdownSlice from "../../redux/dropdown/dropdownSlice";
import liveonstageSlice from "../../redux/liveonstage/liveonstageSlice";
import { api } from "../../service/api";

jest.mock("../../service/api");

const YEARS = [
  { id: 2, name: "2026", status: 1 },
  { id: 1, name: "2025", status: 0 },
];

const RESULTS = {
  2025: [
    { id: 1, deanery: "Ludhiana", parish: "BRS Nagar", event: "Bhangra", position: "1st", point: 30 },
  ],
};

const withProviders = (ui) =>
  render(
    <Provider
      store={configureStore({
        reducer: { leaderBoardSlice, dropdownSlice, liveonstageSlice },
      })}
    >
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );

beforeEach(() => {
  api.mockReset();
  api.mockImplementation((method, endpoint) => {
    if (endpoint === "dropdown")
      return Promise.resolve({ year: YEARS, deanery: [], events: [], places: [], parish: [], leader_board: [] });
    if (endpoint.startsWith("v2/leaderBoard")) return Promise.resolve(RESULTS);
    if (endpoint.startsWith("liveonstage")) return Promise.resolve([]);
    return Promise.resolve({});
  });
});

describe("every page renders with the 2026 design", () => {
  test("home shows the 2026 hero, countdown and notice", () => {
    withProviders(<Home />);
    expect(
      screen.getByText(/Bp. Symphorian Memorial Cultural & Sports Meet/)
    ).toBeInTheDocument();
    expect(screen.getByText(/5th Diocesan Meet/)).toBeInTheDocument();
    expect(screen.getByText(/Registration closed on 31 August 2026/)).toBeInTheDocument();
  });

  test("events page lists the 2026 groups and themes", () => {
    withProviders(<Events />);
    expect(screen.getByText("Events 2026")).toBeInTheDocument();
    expect(screen.getByText("Themes announced for 2026")).toBeInTheDocument();
    expect(screen.getByText(/800th anniversary of St. Francis of Assisi/)).toBeInTheDocument();
    expect(screen.getByText("Athletics — Boys")).toBeInTheDocument();
  });

  test("about page carries the 2026 rules, prizes and contact", () => {
    withProviders(<About />);
    expect(screen.getByText("About & Rules")).toBeInTheDocument();
    expect(screen.getByText(/Ref. No. CYD\/04\/26/)).toBeInTheDocument();
    expect(screen.getByText(/Rs. 25,000 & Trophy/)).toBeInTheDocument();
    expect(screen.getByText(/tug-of-war/)).toBeInTheDocument();
    expect(screen.getByText(/ages 14–30/)).toBeInTheDocument();
  });

  test("schedule renders the three 2026 days from the PDF timetable", () => {
    withProviders(<Schedule />);
    expect(screen.getByText("Schedule")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Day 1/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Day 2/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Day 3/ })).toBeInTheDocument();
    expect(screen.getByText(/8th September 2026/)).toBeInTheDocument();
  });

  test("header and footer show the 2026 branding", () => {
    withProviders(
      <>
        <Header />
        <Footer />
      </>
    );
    expect(screen.getAllByText(/2026/).length).toBeGreaterThan(0);
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Leaderboard" })).toBeInTheDocument();
  });

  test("admin renders the locked login card", () => {
    withProviders(<Admin />);
    expect(screen.getByText("Admin Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
  });
});
