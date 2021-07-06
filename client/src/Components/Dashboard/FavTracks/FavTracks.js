import React from "react";
import styled from "styled-components";
import Track from "../../Msc/Track";

const TopTrackContainer = styled.div`
  height: fit-content;
  width: 30%;
  border: purple 1px solid;
`;

const TopTrackTitle = styled.h1`
  color: #eab971;
  font-size: 1.2rem;
  margin-bottom: 7.5px;
  text-align: center;
`;

const TopTracks = styled.div`
  height: 300px;
  width: 100%;
  background-color: #293d3d;
  border-radius: 15px;
`;

export default function FavTracks({ topTracksData }) {
  return (
    <TopTrackContainer>
      <TopTrackTitle>Top Tracks of All Time</TopTrackTitle>
      <TopTracks>
        {topTracksData.map((track) => (
          <Track key={track.trackName} track={track} />
        ))}
      </TopTracks>
    </TopTrackContainer>
  );
}
