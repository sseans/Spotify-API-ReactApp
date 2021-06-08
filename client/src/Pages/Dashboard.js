import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth.js";
import SpotifyWebApi from "spotify-web-api-node";
import ClipLoader from "react-spinners/ClipLoader";
import Search from "../Components/Dashboard/Search/Search";
import SearchResult from "../Components/Dashboard/Search/SearchResult.js";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: fixed;
  top: 12.5px;
  width: 100%;
`;

const SearchResultsContainer = styled.div`
  max-height: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: var(--navy);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--dark-slate);
    border: 3px solid var(--navy);
    border-radius: 10px;
  }
`;

const spotifyApi = new SpotifyWebApi({
  clientId: "790b0e732d4f4ac397b1207b4a54b1da",
});

const tracks = [];

export default function Dashboard({ code }) {
  let [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const accessToken = useAuth(code);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    setLoading(false);
    fillData();
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  }, [search, accessToken]);

  function fillData() {
    spotifyApi.getMySavedTracks().then(
      (data) => {
        data.body.items.map((x) => {
          tracks.push(x.track);
          return x;
        });
        console.log(tracks);
        console.log("Some information about the authenticated user", data);
      },
      (err) => {
        console.log("Something went wrong!", err);
      }
    );
  }

  return loading ? (
    <ClipLoader color="#1ed760" loading={loading} size={150} />
  ) : (
    <SearchContainer>
      <Search search={search} setSearch={setSearch} />
      {search ? (
        <SearchResultsContainer>
          {searchResults.map((track) => {
            return <SearchResult key={track.uri} track={track} />;
          })}
        </SearchResultsContainer>
      ) : null}
    </SearchContainer>
  );
}
