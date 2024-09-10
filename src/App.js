import styled from "styled-components";
import "./App.css";
import ScoreBoard from "./pages/ScoreBoard";

function App() {
  return (
    <AppWrapper>
      <ScoreBoard />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
