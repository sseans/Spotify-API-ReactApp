import React from "react";
import styled from "styled-components";

const TrackContainer = styled.div`
  width: 100%;
  height: 100px;
  border: yellow 1px solid;
`;

export default function Track({ track }) {
  return <TrackContainer>{track.trackName}</TrackContainer>;
}
