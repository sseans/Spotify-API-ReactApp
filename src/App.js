import styled from "styled-components";

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFakeContent = styled.header`
  width: 90%;
  height: 2000px;
  background-color: var(--slate);
`;

function App() {
  return (
    <StyledApp>
      <StyledFakeContent>Hello</StyledFakeContent>
    </StyledApp>
  );
}

export default App;
