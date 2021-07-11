import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth.js";
import SpotifyWebApi from "spotify-web-api-node";
import ClipLoader from "react-spinners/ClipLoader";
import Search from "../Components/Dashboard/Search/Search";
import styled from "styled-components";
import Player from "../Components/Dashboard/Player/Player.js";
import User from "../Components/User";
import FavTracks from "../Components/Dashboard/FavTracks/FavTracks";
import FavArtists from "../Components/Dashboard/FavArtists/FavArtists.js";

const Navbar = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 0px 15px;
  justify-content: space-between;
`;

const HeaderSVG = styled.svg`
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
`;

const spotifyApi = new SpotifyWebApi({
  clientId: "790b0e732d4f4ac397b1207b4a54b1da",
});

export default function Dashboard({ code }) {
  let [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [playingTrack, setPlayingTrack] = useState();
  const [userData, setUserData] = useState();
  const [topTracksData, setTopTracksData] = useState();
  const [topArtistsData, setTopArtistsData] = useState();

  const accessToken = useAuth(code);

  // Play (track) => requires track.uri
  function chooseTrack(track) {
    console.log(track);
    setPlayingTrack(track);
    setSearch("");
  }

  // Play first searchResult by pressing enter => passed down into <search /> component
  function pickFirstTrack() {
    chooseTrack(searchResults[0]);
  }

  // Main page content trigger => if accessToken is added/changed fill page content
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    setLoading(false);
    fillUserData();
    fillTopTrackData();
    test();
  }, [accessToken]);

  // Search useffect => when something is typed in the search input
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    // let cancel makes sure the search isnt searched for every single character typed
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      // Set search results usestate
      setSearchResults(
        res.body.tracks.items.map((track) => {
          // Find smallest album art
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          // Return an object for each track with useful data
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

  // Get User Data for currently logged in user
  function fillUserData() {
    spotifyApi.getMe().then(
      (data) => {
        // Set User Data usestate
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
  }

  // Favourite Tracks => Long Term
  function fillTopTrackData() {
    spotifyApi.getMyTopTracks({ time_range: "long_term", limit: 10 }).then(
      (data) => {
        let topTracks = data.body.items;
        // Set Top Track State mapping through each track in the json response
        setTopTracksData([
          ...topTracks.map((track) => {
            // Finds the smallest album art to be used as a thumbnail
            let smallestAlbumArt = track.album.images.reduce((acc, cv) => {
              if (cv.height <= acc.height) {
                acc = cv;
              }
              return acc;
            });
            // Converts TrackDuration in Millisecs to minute:second form
            let trackDuration = (track.duration_ms / 1000 / 60)
              .toString()
              .split(".");
            trackDuration[1] = Math.round(
              parseFloat("0." + trackDuration[1]) * 60
            ).toString();
            // Return an object for each track with useful data
            return {
              albumUrl: smallestAlbumArt.url,
              albumName: track.album.name,
              artist: track.artists[0].name,
              trackName: track.name,
              uri: track.uri,
              duration: trackDuration.join(":"),
            };
          }),
        ]);
      },
      (err) => {
        console.log("Error in FillTopTracks() : ", err);
      }
    );
  }

  // Favourite Artists => Long Term
  function test() {
    spotifyApi.getMyTopArtists({ time_range: "long_term", limit: 10 }).then(
      (data) => {
        let topArtists = data.body.items;
        console.log(topArtists);
        // Set Top Artist State mapping through each artist in the json response
        setTopArtistsData([
          ...topArtists.map((artist) => {
            // Finds the smallest artist picture to be used as a thumbnail
            let smallestArtistPicture = artist.images.reduce((acc, cv) => {
              if (cv.height <= acc.height) {
                acc = cv;
              }
              return acc;
            });
            // Return two Genres
            let genres = artist.genres.slice(0, 2);
            // Return an object for each artist with useful data
            return {
              pictureUrl: smallestArtistPicture.url,
              followers: artist.followers.total,
              artist: artist.name,
              uri: artist.uri,
              popularity: artist.popularity,
              genres: genres,
              id: artist.id,
            };
          }),
        ]);
      },
      (err) => {
        console.log("Error : .getMe() : ", err);
      }
    );
  }

  return loading ? (
    <ClipLoader color="#1ed760" loading={loading} size={150} />
  ) : (
    <>
      <HeaderSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#EEC78C"
          d="M0,256L40,224C80,192,160,128,240,133.3C320,139,400,213,480,218.7C560,224,640,160,720,122.7C800,85,880,75,960,69.3C1040,64,1120,64,1200,74.7C1280,85,1360,107,1400,117.3L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </HeaderSVG>
      <Navbar>
        {userData ? <User userData={userData} /> : null}
        <Search
          search={search}
          setSearch={setSearch}
          pickFirstTrack={pickFirstTrack}
          searchResults={searchResults}
          chooseTrack={chooseTrack}
        />
      </Navbar>
      {topTracksData && topArtistsData ? (
        <ContentContainer>
          <FavTracks topTracksData={topTracksData} chooseTrack={chooseTrack} />
          <FavArtists topArtistsData={topArtistsData} />
        </ContentContainer>
      ) : null}
      <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    </>
  );
}
