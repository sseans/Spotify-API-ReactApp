import React from "react";
import styled from "styled-components";
import { TiMediaPlay } from "react-icons/ti";

const TrackContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  margin: 3px 0;
  position: relative;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    transition: all 200ms ease-in;
  }
  &:hover {
    &::after {
      background-color: #eea477;
      opacity: 0.3;
    }
  }
`;

const TrackAlbumArtContainer = styled.div`
  flex: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const TrackAlbumArt = styled.img`
  height: 35px;
  border-radius: 15px;
`;

const TrackNameContainer = styled.div`
  height: 100%;
  width: fit-content;
  flex: 55%;
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
  flex: 12.5%;
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Track({ track, chooseTrack }) {
  return (
    <TrackContainer onClick={() => chooseTrack(track)}>
      <TrackAlbumArtContainer>
        <TrackAlbumArt src={track.albumUrl} alt={track.albumName} />
      </TrackAlbumArtContainer>
      <TrackNameContainer>
        <TrackName>{track.trackName}</TrackName>
        <TrackArtist>{track.artist}</TrackArtist>
      </TrackNameContainer>
      <TrackTime>
        <TiMediaPlay />
        {track.duration}
      </TrackTime>
    </TrackContainer>
  );
}
