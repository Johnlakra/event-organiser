import React from "react";
import { render, screen } from "@testing-library/react";
import LiveEvents from "../LiveEvents";

const STAGES = [
  {
    id: 1,
    stage_id: 1,
    stage_name: "Stage 1",
    current_event: "Thank you for coming, God Bless us all",
    next_event: "BSMCSM2026",
    live: 1,
  },
  { id: 2, stage_id: 2, stage_name: "Stage 2", current_event: "", next_event: "", live: 0 },
  { id: 6, stage_id: 6, stage_name: "Ground", current_event: "", next_event: "", live: 0 },
];

describe("LiveEvents", () => {
  test("renders a card only for stages that have a current event", () => {
    render(<LiveEvents events={STAGES} />);
    expect(screen.getByText("Stage 1")).toBeInTheDocument();
    expect(screen.queryByText("Stage 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Ground")).not.toBeInTheDocument();
  });

  test("never renders the Free or Nothing-scheduled placeholders", () => {
    render(<LiveEvents events={STAGES} />);
    expect(screen.queryByText("Free")).not.toBeInTheDocument();
    expect(screen.queryByText(/Nothing scheduled/)).not.toBeInTheDocument();
  });

  test("shows the current and next event for an active stage", () => {
    render(<LiveEvents events={STAGES} />);
    expect(
      screen.getByText("Thank you for coming, God Bless us all")
    ).toBeInTheDocument();
    expect(screen.getByText("Next · BSMCSM2026")).toBeInTheDocument();
  });

  test("omits the Next line when the active stage has nothing queued", () => {
    render(
      <LiveEvents
        events={[{ id: 3, stage_name: "Stage 3", current_event: "Bhangra", next_event: "", live: 1 }]}
      />
    );
    expect(screen.getByText("Bhangra")).toBeInTheDocument();
    expect(screen.queryByText(/^Next ·/)).not.toBeInTheDocument();
  });

  test("treats a whitespace-only current event as idle", () => {
    render(
      <LiveEvents
        events={[{ id: 9, stage_name: "Stage 9", current_event: "   ", next_event: "", live: 1 }]}
      />
    );
    expect(screen.queryByText("Stage 9")).not.toBeInTheDocument();
    expect(screen.getByText("No stage is live right now.")).toBeInTheDocument();
  });

  test("shows the LIVE badge only for a stage flagged live", () => {
    render(
      <LiveEvents
        events={[
          { id: 1, stage_name: "Stage 1", current_event: "Bhangra", next_event: "", live: 1 },
          { id: 2, stage_name: "Stage 2", current_event: "Extempore", next_event: "", live: 0 },
        ]}
      />
    );
    expect(screen.getAllByText("LIVE")).toHaveLength(1);
    expect(screen.getByText("Extempore")).toBeInTheDocument();
  });

  test("falls back to a single line when no stage is active", () => {
    render(<LiveEvents events={[]} />);
    expect(screen.getByText("No stage is live right now.")).toBeInTheDocument();
    expect(document.querySelectorAll(".stage-card")).toHaveLength(0);
  });
});
