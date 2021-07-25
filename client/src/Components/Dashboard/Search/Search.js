import React from "react";
import styled from "styled-components";
// import SearchResult from "./SearchResult";
import Track from "../../Msc/Track";
import SearchBar from "./SearchBar.js";

const SearchContainer = styled.div`
  position: relative;
  width: 40%;
  margin: 0 15px;
  @media screen and (max-width: 722px) {
    width: 80%;
  }
`;

const SearchResultRoundedCornerDiv = styled.div`
  position: absolute;
  z-index: 98;
  top: 11px;
  margin: 2px 0;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
`;

const SearchResultsContainer = styled.div`
  padding: 25px 5px 0px 5px;
  height: calc(100vh - 120px);
  max-height: 600px;
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--very-dark-green);
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: var(--very-dark-green);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--gold-crayola);
    border: 3px solid var(--very-dark-green);
    border-radius: 10px;
  }
`;

const SearchBackdrop = styled.div`
  position: absolute;
  z-index: 97;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  background-color: transparent;
  opacity: 1;
  transition: all 200ms ease-in-out;
  /* Lets see if this blur works */
  -webkit-backdrop-filter: url("#blur");
  backdrop-filter: url("#blur");
  -webkit-filter: blur(2px);
  filter: blur(2px);
  backdrop-filter: blur(2px);
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
    height: 100%;
    width: 100%;
    background-color: black;
  }
`;

export default function Search({
  search,
  setSearch,
  pickFirstTrack,
  searchResults,
  chooseTrack,
  addOneToRec,
}) {
  return (
    <>
      {search !== "" ? <SearchBackdrop onClick={() => setSearch("")} /> : null}
      <SearchContainer>
        <SearchBar
          search={search}
          setSearch={setSearch}
          pickFirstTrack={pickFirstTrack}
        />
        {search ? (
          <SearchResultRoundedCornerDiv>
            <SearchResultsContainer>
              {searchResults.map((track) => {
                return (
                  <Track
                    key={track.trackName + Math.floor(Math.random() * 1000)}
                    track={track}
                    chooseTrack={chooseTrack}
                    addOneToRec={addOneToRec}
                  />
                );
              })}
            </SearchResultsContainer>
          </SearchResultRoundedCornerDiv>
        ) : null}
      </SearchContainer>
    </>
  );
}
