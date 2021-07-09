import React from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult";
import SearchBar from "./SearchBar.js";

const SearchContainer = styled.div`
  position: relative;
  width: 40%;
  margin: 0 15px;
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
  padding: 15px 5px 0px 5px;
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

export default function Search({
  search,
  setSearch,
  pickFirstTrack,
  searchResults,
  chooseTrack,
}) {
  return (
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
                <SearchResult
                  chooseTrack={chooseTrack}
                  key={track.uri}
                  track={track}
                />
              );
            })}
          </SearchResultsContainer>
        </SearchResultRoundedCornerDiv>
      ) : null}
    </SearchContainer>
  );
}
