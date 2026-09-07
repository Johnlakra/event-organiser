import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

jest.mock("./service/api", () => ({
  api: jest.fn(() => Promise.resolve([])),
}));

test("renders the site header and its navigation", async () => {
  // Arrange / Act
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Assert
  expect(await screen.findByRole("link", { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /leaderboard/i })).toBeInTheDocument();
});
