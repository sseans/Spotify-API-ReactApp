import React from "react";
import styled from "styled-components";
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
  position: relative;
`;

const TopTrackSwitcherContainer = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
`;

const TopTrackSwitcher = styled.div`
  /* position: absolute; */
  border-radius: 15px;
  z-index: 1;
  height: 25px;
  width: 100px;
  background-color: #354f4f;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  font-weight: bold;
  &:hover {
    border: #eec78c 1px solid;
    cursor: pointer;
  }
`;

export default function ElementContainer(props) {
  return (
    <TopTrackContainer>
      <TopTrackTitle>
        {props.type === "artists" ? "Top Artists" : "Top Tracks"}
        <BsArrowsAngleExpand />
      </TopTrackTitle>
      <TopTracks>
        <TopTrackSwitcherContainer>
          <TopTrackSwitcher>Long Term</TopTrackSwitcher>
          <TopTrackSwitcher>Medium Term</TopTrackSwitcher>
          <TopTrackSwitcher>Short Term</TopTrackSwitcher>
        </TopTrackSwitcherContainer>
        {props.children}
      </TopTracks>
    </TopTrackContainer>
  );
}
