import React from "react";
import styled from "styled-components";
import Track from "../../Msc/Track";

const TopTrackContainer = styled.div`
  height: fit-content;
  width: 30%;
`;

const TopTrackTitle = styled.h1`
  color: #dce7e5;
  font-size: 1.2rem;
  margin-bottom: 7.5px;
  text-align: center;
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
      <TopTrackTitle>Top Tracks of All Time</TopTrackTitle>
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
