import reducer, {
  addBatchBoardItem,
  deleteBoardItem,
  getLeaderBoardItems,
} from "./leaderBoardSlice";

jest.mock("../../service/api", () => ({ api: jest.fn() }));

const rows = [{ id: 1, deanery: "Ajnala", parish: "Chamiyari", point: 30 }];

test("stores the rows returned by getLeaderBoardItems", () => {
  // Arrange
  const initial = reducer(undefined, { type: "@@INIT" });

  // Act
  const next = reducer(initial, {
    type: getLeaderBoardItems.fulfilled.type,
    payload: rows,
  });

  // Assert
  expect(next.data).toEqual(rows);
});

test("keeps the rows when a batch add resolves", () => {
  // Arrange
  const loaded = reducer(undefined, {
    type: getLeaderBoardItems.fulfilled.type,
    payload: rows,
  });

  // Act
  const next = reducer(loaded, {
    type: addBatchBoardItem.fulfilled.type,
    payload: { success: "All LeaderBoard records added successfully" },
  });

  // Assert
  expect(next.data).toEqual(rows);
});

test("keeps the rows when a delete resolves", () => {
  // Arrange
  const loaded = reducer(undefined, {
    type: getLeaderBoardItems.fulfilled.type,
    payload: rows,
  });

  // Act
  const next = reducer(loaded, {
    type: deleteBoardItem.fulfilled.type,
    payload: { success: "Leadeerboard deleted successfully" },
  });

  // Assert
  expect(next.data).toEqual(rows);
});
