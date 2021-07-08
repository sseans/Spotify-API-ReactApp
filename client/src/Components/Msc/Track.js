import React from "react";
import styled from "styled-components";

const TrackContainer = styled.div`
  width: 100%;
  height: 40px;
  border: yellow 1px solid;
  display: flex;
`;

const TrackAlbumArtContainer = styled.div`
  flex: 15%;
  height: 100%;
  border: red 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TrackAlbumArt = styled.img`
  height: 35px;
  border-radius: 15px;
`;

const TrackNameContainer = styled.div`
  height: 100%;
  width: fit-content;
  flex: 70%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
`;

const TrackName = styled.h1`
  font-size: 0.9rem;
`;

const TrackArtist = styled.h2`
  font-size: 0.6rem;
`;

export default function Track({ track }) {
  return (
    <TrackContainer>
      <TrackAlbumArtContainer>
        <TrackAlbumArt src={track.albumUrl} alt={track.albumName} />
      </TrackAlbumArtContainer>
      <TrackNameContainer>
        <TrackName>{track.trackName}</TrackName>
        <TrackArtist>{track.artist}</TrackArtist>
      </TrackNameContainer>
    </TrackContainer>
  );
}
