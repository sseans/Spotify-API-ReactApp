import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: fit-content;
  width: 100%;
  margin: 20px 20px;
`;

const Suggestions = styled.div`
  height: 150px;
  width: 100%;
  background-color: #293d3d;
  border-radius: 15px;
  padding: 3px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 0.8rem;
`;

const SuggestionButton = styled.button`
  width: fit-content;
  padding: 0 10px;
  height: 30px;
  border-radius: 15px;
  background-color: #1db954;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  border: none;
  letter-spacing: 0.1rem;
  cursor: pointer;
  margin: 30px;
  padding-top: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  text-decoration: none;
  &:hover {
    background-color: #1ed760;
  }
  &:active {
    background-color: #199e48;
  }
`;

export default function SuggestionBuilder() {
  return (
    <Container>
      <Suggestions>
        <SuggestionButton>recommend some tracks</SuggestionButton>
      </Suggestions>
    </Container>
  );
}
