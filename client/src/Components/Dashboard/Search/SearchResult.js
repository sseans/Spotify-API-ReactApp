import React from "react";
import styled from "styled-components";

const SearchResultContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 2.5px 0px;
  margin-top: 5px;
  cursor: pointer;
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
    font-size: 1rem;
    font-weight: 800;
    color: white;
  }
  h2 {
    font-size: 0.8rem;
  }
`;

export default function SearchResults({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <SearchResultContainer onClick={handlePlay}>
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
