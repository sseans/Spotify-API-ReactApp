import React from "react";
import styled from "styled-components";
import Artist from "../../Msc/Artist";

const TopArtistContainer = styled.div`
  height: fit-content;
  width: 30%;
`;

const TopArtistTitle = styled.h1`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 7.5px;
  text-align: center;
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
      <TopArtistTitle>Top Artists of All Time</TopArtistTitle>
      <TopArtists>
        {topArtistsData.map((artist) => (
          <Artist key={artist.artist} artist={artist} />
        ))}
      </TopArtists>
    </TopArtistContainer>
  );
}
