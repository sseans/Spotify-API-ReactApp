import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth.js";
import SpotifyWebApi from "spotify-web-api-node";
import ClipLoader from "react-spinners/ClipLoader";
import Search from "../Components/Dashboard/Search/Search";
import SearchResult from "../Components/Dashboard/Search/SearchResult.js";
import styled from "styled-components";
import Player from "../Components/Dashboard/Player/Player.js";
import User from "../Components/User";

const SearchContainer = styled.div`
  position: fixed;
  top: 12.5px;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--very-dark-green);
  border-radius: 15px;
  margin: 0 15px;
`;

const SearchResultsContainer = styled.div`
  position: relative;
  margin: 2px 0;
  height: calc(100% - 120px);
  max-height: 600px;
  overflow-y: scroll;
  width: 90%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
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

const spotifyApi = new SpotifyWebApi({
  clientId: "790b0e732d4f4ac397b1207b4a54b1da",
});

// const tracks = [];

export default function Dashboard({ code }) {
  let [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [playingTrack, setPlayingTrack] = useState();
  const [userData, setUserData] = useState();

  const accessToken = useAuth(code);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }

  function pickFirstTrack() {
    chooseTrack(searchResults[0]);
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    setLoading(false);
    fillUserData();
    fillTopTrackData();
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
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
    return () => (cancel = true);
  }, [search, accessToken]);

  function fillUserData() {
    spotifyApi.getMe().then(
      (data) => {
        setUserData({
          displayName: data.body.display_name,
          userName: data.body.id,
          followers: data.body.followers.total,
          imageUrl: data.body.images[0].url,
        });
      },
      (err) => {
        console.log("Error : .getMe() : ", err);
      }
    );
    spotifyApi.getMyTopArtists({ limit: 10 }).then(
      (data) => {
        let topTracks = data.body.items;
        console.log(topTracks);
      },
      (err) => {
        console.log("Error : .getMe() : ", err);
      }
    );
  }

  function fillTopTrackData() {}

  return loading ? (
    <ClipLoader color="#1ed760" loading={loading} size={150} />
  ) : (
    <>
      <SearchContainer>
        <Search
          search={search}
          setSearch={setSearch}
          pickFirstTrack={pickFirstTrack}
        />
        {search ? (
          <SearchResultsContainer>
            {searchResults.map((track) => {
              return (
                <SearchResult
                  chooseTrack={chooseTrack}
                  key={track.uri}
                  track={track}
                />
              );
            })}
          </SearchResultsContainer>
        ) : null}
      </SearchContainer>
      {userData ? <User userData={userData} /> : null}
      <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    </>
  );
}
