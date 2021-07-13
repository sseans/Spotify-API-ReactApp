import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";

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
    text-decoration: none;
    color: white;
    &:hover {
      transform: scale(1.05);
    }
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

const ChildContainer = styled.div`
  height: 100%;
  width: 100%;
  max-height: 65vh;
  overflow-y: auto;
  /* background-color: var(--very-dark-green); */
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: var(--very-dark-green);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--gold-crayola);
    border: 3px solid var(--very-dark-green);
    border-radius: 10px;
  }
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

export default function ElementContainer({
  type,
  Link,
  triggerFillFunction,
  children,
}) {
  const location = useLocation();
  const [termState, setTermState] = useState("long_term");
  const [trackAmount, setTrackAmount] = useState(
    location.pathname === "/" ? 10 : 30
  );

  useEffect(() => {
    triggerFillFunction(termState, trackAmount);
    console.log("useEffect from element container");
    console.log(termState, trackAmount);
  }, [termState, location.pathname]);

  return (
    <TopTrackContainer>
      <TopTrackTitle>
        {type === "artists" ? "Top Artists" : "Top Tracks"}
        {trackAmount === 30 ? (
          <Link to="/">
            <BsArrowsAngleContract
              onClick={() => {
                setTrackAmount(10);
              }}
            />
          </Link>
        ) : (
          <Link to={type === "artists" ? "/artists" : "/tracks"}>
            <BsArrowsAngleExpand
              onClick={() => {
                setTrackAmount(30);
              }}
            />
          </Link>
        )}
      </TopTrackTitle>
      <TopTracks>
        <TopTrackSwitcherContainer>
          <TopTrackSwitcher
            onClick={() => {
              setTermState("long_term");
            }}
          >
            Long Term
          </TopTrackSwitcher>
          <TopTrackSwitcher
            onClick={() => {
              setTermState("medium_term");
            }}
          >
            Medium Term
          </TopTrackSwitcher>
          <TopTrackSwitcher
            onClick={() => {
              setTermState("short_term");
            }}
          >
            Short Term
          </TopTrackSwitcher>
        </TopTrackSwitcherContainer>
        <ChildContainer>{children}</ChildContainer>
      </TopTracks>
    </TopTrackContainer>
  );
}
