import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { AiFillStar } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const ArtistContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin: 3px 0;
  position: relative;
  cursor: pointer;
  .icon {
    font-size: 1.5rem;
    position: relative;
    z-index: 2;
    :hover {
      transform: scale(1.35);
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

const ArtistImageContainer = styled.div`
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

const ArtistImage = styled.img`
  height: 35px;
  border-radius: 15px;
`;

const ArtistNameContainer = styled.div`
  height: 100%;
  width: fit-content;
  flex: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
`;

const ArtistName = styled.h1`
  font-size: 0.75rem;
  color: #dce7e5;
  @media screen and (max-width: 722px) {
    font-size: 0.65rem;
  }
`;

const ArtistGenres = styled.h2`
  font-size: 0.6rem;
  opacity: 0.7;
  color: #93b7be;
  @media screen and (max-width: 722px) {
    font-size: 0.55rem;
  }
`;

const ArtistPopularity = styled.div`
  min-width: 40px;
  max-width: 80px;
  flex: 12.5%;
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 3px;
  svg {
    padding-left: 1px;
  }
`;

export default function Artist({ artist, addOneToRec, removeOneFromRec }) {
  const location = useLocation();
  const RenderPlusIcon = location.pathname === "/" ? true : false;

  return (
    <ArtistContainer>
      <ArtistImageContainer>
        <ArtistImage src={artist.pictureUrl} alt={artist.artist} />
      </ArtistImageContainer>
      <ArtistNameContainer>
        <ArtistName>{artist.artist}</ArtistName>
        <ArtistGenres>
          {artist.genres.map((genre, index) =>
            index === 1
              ? genre
              : `${genre} ${artist.genres.length > 1 ? "and" : ""} `
          )}
        </ArtistGenres>
      </ArtistNameContainer>
      {RenderPlusIcon && !artist.showCross ? (
        <BsPlus
          onClick={(event) => {
            event.stopPropagation();
            if (!addOneToRec) return;
            addOneToRec(artist);
          }}
          className="icon"
        />
      ) : artist.showCross ? (
        <IoClose
          onClick={(event) => {
            event.stopPropagation();
            if (!removeOneFromRec) return;
            removeOneFromRec(artist);
          }}
          className="icon"
        />
      ) : null}
      <ArtistPopularity>
        {artist.popularity}
        <AiFillStar />
      </ArtistPopularity>
    </ArtistContainer>
  );
}
