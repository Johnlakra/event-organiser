import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Check, Trash, Plus } from "lucide-react";
import "./LeaderboardForm.css";
import { useDispatch, useSelector } from "react-redux";
import { dropdownState, getDropdown } from "../../redux/dropdown/dropdownSlice";
import {
  addBatchBoardItem,
  deleteBoardItem,
} from "../../redux/leaderBoard/leaderBoardSlice";
import toast from "react-hot-toast";
import { sortYearsDesc } from "../../utils/years";

const CURRENT_YEAR_STATUS = 1;

const pickDefaultYear = (years = []) =>
  years.find((year) => Number(year.status) === CURRENT_YEAR_STATUS) ??
  years[0] ??
  null;

/** Select elements hand back strings; every id compared downstream is a number. */
const toId = (value) => (value === "" || value === null ? "" : Number(value));

const LeaderboardForm = () => {
  const [formData, setFormData] = useState({});
  const [selectedYearId, setSelectedYearId] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector(dropdownState);
  const [load, setLoad] = useState({ submit: false });
  const [render, setRender] = useState({
    events: data.events ?? [],
    places: data.places ?? [],
    deanery: data.deanery ?? [],
    parish: data.parish ?? [],
    leader_board: data.leader_board ?? [],
    year: data.year ?? [],
  });

  const selectedYear = useMemo(
    () =>
      (render.year ?? []).find(
        (year) => String(year.id) === String(selectedYearId)
      ) ?? null,
    [render.year, selectedYearId]
  );

  const handleAddEntry = (event, position) => {
    setFormData((prev) => ({
      ...prev,
      [event]: {
        ...prev[event],
        [position]: [
          ...(prev[event]?.[position] ?? []),
          { event, position, deanery: "", parish: "", entry: true },
        ],
      },
    }));
  };

  const handlePositionChange = (event, position, index, field, value) => {
    const parsed = toId(value);

    setFormData((prev) => ({
      ...prev,
      [event]: {
        ...prev[event],
        [position]: prev[event]?.[position]?.map((item, idx) => {
          if (idx !== index) return item;
          // Switching deanery invalidates any parish already picked under it.
          const cleared = field === "deanery" ? { parish: "" } : {};
          return { ...item, ...cleared, [field]: parsed, entry: true };
        }) ?? [{ event, position, [field]: parsed, entry: true }],
      },
    }));
  };

  const refreshDropdowns = useCallback(async () => {
    const result = await dispatch(getDropdown());
    if (result?.error) {
      toast.error(result.error.message ?? "Could not refresh the leaderboard");
    }
  }, [dispatch]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!isConfirmed) return;

    try {
      setLoad((prev) => ({ ...prev, submit: true }));
      const result = await dispatch(deleteBoardItem(id));
      if (result?.error) {
        toast.error(result.error.message ?? "Failed to delete the entry");
        return;
      }
      await refreshDropdowns();
      toast.success(result?.payload?.success ?? "Entry deleted");
    } catch (error) {
      toast.error(error.message ?? "Failed to delete the entry");
    } finally {
      setLoad((prev) => ({ ...prev, submit: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedYearId) {
      toast.error("Select a year before submitting");
      return;
    }

    const payload = Object.values(formData).flatMap((positions) =>
      Object.values(positions).flatMap((entries) =>
        entries
          .filter((entry) => entry.entry && entry.deanery)
          .map((entry) => ({
            deanery_id: entry.deanery,
            parish_id: entry.parish,
            event_id: entry.event,
            position_id: entry.position,
            year_id: selectedYearId,
          }))
      )
    );

    if (payload.length === 0) {
      toast.error("Nothing new to submit");
      return;
    }

    try {
      setLoad((prev) => ({ ...prev, submit: true }));
      const result = await dispatch(addBatchBoardItem(payload));
      if (result?.error) {
        toast.error(result.error.message ?? "Failed to save the leaderboard");
        return;
      }
      await refreshDropdowns();
      toast.success(
        result?.payload?.success ?? `Saved for ${selectedYear?.name ?? "the year"}`
      );
    } catch (error) {
      toast.error(error.message ?? "Failed to save the leaderboard");
    } finally {
      setLoad((prev) => ({ ...prev, submit: false }));
    }
  };

  const renderPositions = (type) =>
    (render.places ?? []).filter((item) => item.type === type);

  const toggleEvent = (event) =>
    setRender((prev) => ({
      ...prev,
      events: prev.events.map((item) =>
        item.id === event.id
          ? { ...item, expandEvent: !item.expandEvent }
          : { ...item, expandEvent: false }
      ),
    }));

  const isEventComplete = (type, event) =>
    renderPositions(type)
      .map((item) => item.id)
      .every((position) => formData[event]?.[position]?.[0]?.deanery);

  const fetchDropdowns = useCallback(() => {
    setRender((prev) => ({
      ...prev,
      events: (data.events ?? []).map((item) => ({
        ...item,
        expandEvent: false,
      })),
      places: data.places ?? [],
      deanery: data.deanery ?? [],
      parish: data.parish ?? [],
      leader_board: data.leader_board ?? [],
      year: sortYearsDesc(data.year ?? []),
    }));
  }, [
    data.deanery,
    data.events,
    data.leader_board,
    data.parish,
    data.places,
    data.year,
  ]);

  useEffect(() => {
    fetchDropdowns();
  }, [fetchDropdowns]);

  useEffect(() => {
    if (selectedYearId !== null) return;
    const fallback = pickDefaultYear(render.year);
    if (fallback) setSelectedYearId(fallback.id);
  }, [render.year, selectedYearId]);

  const initialRender = useCallback((rows = []) => {
    setFormData(
      rows.reduce((acc, item) => {
        const { event_id, position_id, deanery_id, parish_id } = item;
        const entry = {
          id: item.id,
          event: event_id,
          position: position_id,
          deanery: deanery_id,
          parish: parish_id,
          entry: false,
        };
        return {
          ...acc,
          [event_id]: {
            ...acc[event_id],
            [position_id]: [...(acc[event_id]?.[position_id] ?? []), entry],
          },
        };
      }, {})
    );
  }, []);

  // Only the selected edition is prefilled, so 2025 results stay untouched
  // while 2026 is being entered.
  useEffect(() => {
    if (!selectedYearId) return;
    const rowsForYear = (render.leader_board ?? []).filter(
      (row) => String(row.year_id) === String(selectedYearId)
    );
    initialRender(rowsForYear);
  }, [initialRender, render.leader_board, selectedYearId]);

  return (
    <div className="leaderboard-form-container">
      <h1 className="leaderboard-form-title">Leaderboard Entry Form</h1>

      <div className="year-picker">
        <label htmlFor="leaderboard-year">Year</label>
        <select
          id="leaderboard-year"
          className="select-input"
          value={selectedYearId ?? ""}
          onChange={(e) => setSelectedYearId(toId(e.target.value))}
        >
          <option value="">Select Year</option>
          {(render.year ?? []).map((year) => (
            <option key={year.id} value={year.id}>
              {year.name}
              {Number(year.status) === CURRENT_YEAR_STATUS ? " (current)" : ""}
            </option>
          ))}
        </select>
        {selectedYear && (
          <p className="year-picker-hint">
            Entries below belong to <strong>{selectedYear.name}</strong>. Other
            years are left untouched.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {render.events.map((event, eventIndex) => (
          <div key={event.id} className="event-item">
            <button
              type="button"
              className="event-header"
              onClick={() => toggleEvent(event)}
            >
              <span>{`${eventIndex + 1}. ${event.name}`}</span>
              <div className="event-status">
                {isEventComplete(event.type, event.id) && (
                  <Check size={20} className="check-icon" />
                )}
                {event.expandEvent ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </button>

            {event.expandEvent && (
              <div className="event-details">
                {renderPositions(event.type).map((position) => (
                  <div key={position.id} className="position-item">
                    <div className="position-header">
                      <h4 className="position-title">
                        Positions {position.name}
                      </h4>
                      <button
                        type="button"
                        className="add-entry-button"
                        onClick={() => handleAddEntry(event.id, position.id)}
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    {(
                      formData[event.id]?.[position.id] ?? [
                        {
                          event: event.id,
                          position: position.id,
                          deanery: "",
                          parish: "",
                        },
                      ]
                    ).map((item, index) => (
                      <div
                        key={`${event.id}_${position.id}_${item.id ?? index}`}
                        style={{ marginBottom: 10, display: "flex" }}
                      >
                        <div style={{ width: "100%", marginRight: 10 }}>
                          <select
                            onChange={(e) =>
                              handlePositionChange(
                                event.id,
                                position.id,
                                index,
                                "deanery",
                                e.target.value
                              )
                            }
                            value={item?.deanery ?? ""}
                            className="select-input"
                          >
                            <option value="">Select Deanery</option>
                            {render.deanery?.map((deanery) => (
                              <option key={deanery.id} value={deanery.id}>
                                {deanery.name}
                              </option>
                            ))}
                          </select>

                          {Boolean(item?.deanery) && (
                            <select
                              onChange={(e) =>
                                handlePositionChange(
                                  event.id,
                                  position.id,
                                  index,
                                  "parish",
                                  e.target.value
                                )
                              }
                              value={item.parish ?? ""}
                              className="select-input"
                            >
                              <option value="">Select Parish</option>
                              {render.parish
                                ?.filter(
                                  (parish) =>
                                    Number(parish.deanery_id) ===
                                    Number(item.deanery)
                                )
                                ?.map((parish) => (
                                  <option key={parish.id} value={parish.id}>
                                    {parish.name}
                                  </option>
                                ))}
                            </select>
                          )}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "end",
                            cursor: item?.id ? "pointer" : "",
                            width: 32,
                          }}
                          onClick={() =>
                            Boolean(item?.id) && handleDelete(item.id)
                          }
                        >
                          <Trash
                            style={{ display: item?.id ? "block" : "none" }}
                            size={32}
                            color="#f67373"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button type="submit" className="submit-button" disabled={load.submit}>
          {load.submit
            ? "Submitting..."
            : `Submit Leaderboard${selectedYear ? ` (${selectedYear.name})` : ""}`}
        </button>
      </form>
    </div>
  );
};

export default LeaderboardForm;
