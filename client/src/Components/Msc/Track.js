import React from "react";
import styled from "styled-components";

const TrackContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  margin: 1px 0;
`;

const TrackAlbumArtContainer = styled.div`
  flex: 15%;
  height: 100%;
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
  flex: 60%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
`;

const TrackName = styled.h1`
  font-size: 0.75rem;
  color: #dce7e5;
`;

const TrackArtist = styled.h2`
  font-size: 0.6rem;
  opacity: 0.7;
  color: #93b7be;
`;

const TrackTime = styled.div`
  flex: 10%;
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
      <TrackTime>{track.duration}</TrackTime>
    </TrackContainer>
  );
}
