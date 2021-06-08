import React from "react";
import styled from "styled-components";

const SearchResultContainer = styled.div`
  display: flex;
`;

export default function SearchResults({ track }) {
  return (
    <SearchResultContainer>
      <img src={track.albumUrl} alt={track.artist} />
      <h1>{track.title}</h1>
      <h2>{track.artist}</h2>
    </SearchResultContainer>
  );
}
