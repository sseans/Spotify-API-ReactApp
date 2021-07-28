import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { TiMediaPlay } from "react-icons/ti";
import { BsPlus } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const TrackContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin: 3px 0;
  position: relative;
  cursor: pointer;
  .heart-icon {
    font-size: 1.3rem;
    position: relative;
    z-index: 2;
    margin-right: 5px;
    :hover {
      transform: scale(1.15);
      color: white;
    }
  }
  .icon {
    font-size: 1.5rem;
    position: relative;
    z-index: 2;
    :hover {
      transform: scale(1.25);
      color: white;
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
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
  flex: 15%;
  max-width: 90px;
  min-width: 50px;
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
  flex: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
`;

const TrackName = styled.h1`
  font-size: 0.75rem;
  color: #dce7e5;
  @media screen and (max-width: 722px) {
    font-size: 0.65rem;
  }
`;

const TrackArtist = styled.h2`
  font-size: 0.6rem;
  opacity: 0.7;
  color: #93b7be;
  @media screen and (max-width: 722px) {
    font-size: 0.55rem;
  }
`;

const TrackTime = styled.div`
  min-width: 40px;
  max-width: 80px;
  flex: 12.5%;
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 3px;
`;

export default function Track({
  track,
  chooseTrack,
  addOneToRec,
  removeOneFromRec,
}) {
  const location = useLocation();
  const RenderPlusIcon = location.pathname === "/" ? true : false;

  return (
    <TrackContainer onClick={() => (chooseTrack ? chooseTrack(track) : null)}>
      <TrackAlbumArtContainer>
        <TrackAlbumArt src={track.albumUrl} alt={track.albumName} />
      </TrackAlbumArtContainer>
      <TrackNameContainer>
        <TrackName>{track.trackName}</TrackName>
        <TrackArtist>{track.artist}</TrackArtist>
      </TrackNameContainer>
      {track.liked ? (
        <AiFillHeart className="heart-icon" />
      ) : (
        <AiOutlineHeart className="heart-icon" />
      )}
      {RenderPlusIcon && !track.showCross ? (
        <BsPlus
          onClick={(event) => {
            event.stopPropagation();
            if (!addOneToRec) return;
            addOneToRec(track);
          }}
          className="icon"
        />
      ) : track.showCross ? (
        <IoClose
          onClick={(event) => {
            event.stopPropagation();
            if (!removeOneFromRec) return;
            removeOneFromRec(track);
          }}
          className="icon"
        />
      ) : null}
      <TrackTime>
        <TiMediaPlay />
        {track.duration}
      </TrackTime>
    </TrackContainer>
  );
}
