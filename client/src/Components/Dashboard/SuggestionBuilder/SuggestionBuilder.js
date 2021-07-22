import React from "react";
import styled from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import Track from "../../Msc/Track";
import Artist from "../../Msc/Artist";

const Container = styled.div`
  height: fit-content;
  width: 100%;
  margin: 20px 20px;
  background-color: #293d3d;
  border-radius: 15px;
`;

const Suggestions = styled.div`
  min-height: 150px;
  width: 100%;
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
  margin: 0 15px 0 0;
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
  @media screen and (max-width: 722px) {
    margin: 30px 0 0 0;
  }
`;

const SourceContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .arrowright {
    font-size: 2rem;
    margin-right: 10px;
    @media screen and (max-width: 722px) {
      display: none;
    }
  }
  @media screen and (max-width: 722px) {
    width: 100%;
    flex-direction: column;
  }
`;

const SuggestionSource = styled.div`
  width: 60%;
  height: fit-content;
  border-radius: 15px;
  background-color: #213131;
  overflow: hidden;
  @media screen and (max-width: 722px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const ItemContainer = styled.div`
  max-height: 150px;
  min-height: 100px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: #213131;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--gold-crayola);
    border: 3px solid #213131;
    border-radius: 10px;
  }
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
const SourceMax = styled.h3`
  font-size: 0.6rem;
  padding-top: 4px;
  color: #93b7be;
`;

const Results = styled.div`
  height: fit-content;
  width: 100%;
`;

const ResultsInner = styled.div`
  margin: 0px 25px 0px 25px;
  padding: 5px 0;
  background-color: #213131;
  border-radius: 15px;
`;

const MakePlaylistContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MakePlaylistButton = styled.button`
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
  margin: 0 15px 0 0;
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

export default function SuggestionBuilder({
  reccomendationData,
  setReccomendationData,
  removeOneFromRec,
  fillReccomendations,
  reccomendations,
  chooseTrack,
}) {
  return (
    <Container>
      <Suggestions>
        <SuggestionButton
          onClick={() => {
            fillReccomendations();
          }}
        >
          recommend some tracks
        </SuggestionButton>
        <SourceContainer>
          <SourceText>
            <SourceTitle>Based On...</SourceTitle>
            <SourceInfo>
              Press the + button to add a Track or Artist to base your
              reccomendation off.
            </SourceInfo>
            <SourceMax>5 Item Max.</SourceMax>
          </SourceText>
          <BsArrowRight className="arrowright" />
          <SuggestionSource>
            <ItemContainer>
              {reccomendationData
                ? reccomendationData.map((item) => {
                    let jsxElement;
                    if (item.type === "artist") {
                      jsxElement = (
                        <Artist
                          key={item.artist + Math.floor(Math.random() * 1000)}
                          artist={item}
                          removeOneFromRec={removeOneFromRec}
                        />
                      );
                    } else if (item.type === "track") {
                      jsxElement = (
                        <Track
                          key={
                            item.trackName + Math.floor(Math.random() * 1000)
                          }
                          track={item}
                          removeOneFromRec={removeOneFromRec}
                        />
                      );
                    }
                    return jsxElement;
                  })
                : null}
            </ItemContainer>
          </SuggestionSource>
        </SourceContainer>
      </Suggestions>
      <Results>
        {reccomendations ? (
          <>
            <ResultsInner>
              {reccomendations.map((track) => (
                <Track
                  key={track.trackName + Math.floor(Math.random() * 1000)}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))}
            </ResultsInner>
            <MakePlaylistContainer>
              <MakePlaylistButton>Make Into A Playlist</MakePlaylistButton>
            </MakePlaylistContainer>
          </>
        ) : null}
      </Results>
    </Container>
  );
}
