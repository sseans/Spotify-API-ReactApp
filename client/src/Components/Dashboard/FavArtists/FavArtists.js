import React from "react";
import styled from "styled-components";
import Artist from "../../Msc/Artist";
import { BsArrowsAngleExpand } from "react-icons/bs";

const TopArtistContainer = styled.div`
  height: fit-content;
  width: 100%;
  margin: 0 20px;
`;

const TopArtistTitle = styled.h1`
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

const TopArtists = styled.div`
  height: fit-content;
  width: 100%;
  background-color: #293d3d;
  border-radius: 15px;
  padding: 3px;
`;

export default function FavArtists({ topArtistsData }) {
  return (
    <TopArtistContainer>
      <TopArtistTitle>
        Top Artists of All Time
        <BsArrowsAngleExpand />
      </TopArtistTitle>
      <TopArtists>
        {topArtistsData.map((artist) => (
          <Artist key={artist.artist} artist={artist} />
        ))}
      </TopArtists>
    </TopArtistContainer>
  );
}
