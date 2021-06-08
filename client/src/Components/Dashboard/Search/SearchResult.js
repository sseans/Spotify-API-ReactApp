import React from "react";
import styled from "styled-components";

const SearchResultContainer = styled.div`
  display: flex;
  width: 60%;
  padding: 10px 10px;
  margin-top: 5px;
`;

const TrackAlbumArtContainer = styled.div`
  width: fit-content;
  margin-right: 15px;
`;

const TrackAlbumArt = styled.img`
  width: auto;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 70%;
  h1 {
    font-size: 0.9rem;
  }
  h2 {
    font-size: 0.7rem;
  }
`;

export default function SearchResults({ track }) {
  return (
    <SearchResultContainer>
      <TrackAlbumArtContainer>
        <TrackAlbumArt src={track.albumUrl} alt={track.artist} />
      </TrackAlbumArtContainer>
      <TrackInfo>
        <h1>{track.title}</h1>
        <h2>{track.artist}</h2>
      </TrackInfo>
    </SearchResultContainer>
  );
}
