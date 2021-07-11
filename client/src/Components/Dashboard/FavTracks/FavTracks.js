import React from "react";
import styled from "styled-components";
import Track from "../../Msc/Track";
import { BsArrowsAngleExpand } from "react-icons/bs";

const TopTrackContainer = styled.div`
  height: fit-content;
  width: 100%;
  margin: 0 20px;
`;

const TopTrackTitle = styled.h1`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 7.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-left: 10px;
    cursor: pointer;
    font-size: 0.9rem;
  }
`;

const TopTracks = styled.div`
  height: fit-content;
  width: 100%;
  background-color: #293d3d;
  border-radius: 15px;
  padding: 3px;
`;

export default function FavTracks({ topTracksData, chooseTrack }) {
  return (
    <TopTrackContainer>
      <TopTrackTitle>
        Top Tracks of All Time
        <BsArrowsAngleExpand />
      </TopTrackTitle>
      <TopTracks>
        {topTracksData.map((track) => (
          <Track
            key={track.trackName}
            track={track}
            chooseTrack={chooseTrack}
          />
        ))}
      </TopTracks>
    </TopTrackContainer>
  );
}
