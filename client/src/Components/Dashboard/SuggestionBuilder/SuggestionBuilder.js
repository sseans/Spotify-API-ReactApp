import React from "react";
import styled from "styled-components";
import { BsArrowRight, BsPlus } from "react-icons/bs";

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
  padding: 25px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  @media screen and (max-width: 722px) {
    flex-direction: column-reverse;
    height: fit-content;
  }
`;

const SuggestionButton = styled.button`
  width: fit-content;
  min-width: fit-content;
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

const SourceContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    font-size: 2rem;
    margin-right: 10px;
  }
  @media screen and (max-width: 722px) {
    width: 100%;
  }
`;

const SuggestionSource = styled.div`
  width: 60%;
  height: fit-content;
  min-height: 100px;
  border-radius: 15px;
  background-color: #213131;
`;

const SourceText = styled.div`
  max-width: 150px;
`;
const SourceTitle = styled.h1`
  font-size: 1rem;
  color: white;
`;
const SourceInfo = styled.h2`
  font-size: 0.7rem;
`;

export default function SuggestionBuilder() {
  return (
    <Container>
      <Suggestions>
        <SuggestionButton>recommend some tracks</SuggestionButton>
        <SourceContainer>
          <SourceText>
            <SourceTitle>Based On...</SourceTitle>
            <SourceInfo>
              Press the + button to add a Track or Artist to base your
              reccomendation off.
            </SourceInfo>
          </SourceText>
          <BsArrowRight />
          <SuggestionSource></SuggestionSource>
        </SourceContainer>
      </Suggestions>
    </Container>
  );
}
