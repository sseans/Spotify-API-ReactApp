import React from "react";
import styled from "styled-components";

const SearchResultContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 2.5px 0px;
  /* margin-top: 5px; */
  cursor: pointer;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -3px;
    width: 0%;
    height: 100%;
    border-radius: 15px;
    background-color: #eea477;
    opacity: 0;
    transition: all 200ms ease;
  }
  &:hover {
    &::after {
      opacity: 0.3;
      width: 100%;
    }
  }
`;

const TrackAlbumArtContainer = styled.div`
  width: fit-content;
  height: 64px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TrackAlbumArt = styled.img`
  height: 100%;
  border-radius: 15px;
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
