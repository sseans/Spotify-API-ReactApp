import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth.js";
import SpotifyWebApi from "spotify-web-api-node";
import ClipLoader from "react-spinners/ClipLoader";
import Search from "../Components/Dashboard/Search/Search";
import styled from "styled-components";
import Player from "../Components/Dashboard/Player/Player.js";
import User from "../Components/User";
import ElementContainer from "../Components/Msc/ElementContainer.js";
import Track from "../Components/Msc/Track";
import Artist from "../Components/Msc/Artist.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SuggestionBuilder from "../Components/Dashboard/SuggestionBuilder/SuggestionBuilder.js";

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
  height: 100%;
  width: 100%;
`;

const TracksContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  padding: 0px 15px;
  @media screen and (max-width: 722px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: auto;
    padding: 50px 15px 20px 15px;
  }
`;

const SuggestionContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  padding: 0px 15px;
  @media screen and (max-width: 722px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: auto;
    padding: 0px 15px 130px 15px;
  }
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
  const [reccomendationData, setReccomendationData] = useState();

  const accessToken = useAuth(code);

  // Play (track) => requires track.uri
  function chooseTrack(track) {
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
    fillTopArtistData();
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
  function fillTopTrackData(termState = "long_term", trackAmount = 10) {
    spotifyApi
      .getMyTopTracks({ time_range: termState, limit: trackAmount })
      .then(
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
              // This adds a '0' to the front of the seconds if it returns a single digit
              if (trackDuration[1] < 10) {
                trackDuration[1] = "0" + trackDuration[1];
              }
              // Return an object for each track with useful data
              return {
                albumUrl: smallestAlbumArt.url,
                albumName: track.album.name,
                artist: track.artists[0].name,
                trackName: track.name,
                uri: track.uri,
                duration: trackDuration.join(":"),
                type: "track",
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
  function fillTopArtistData(termState = "long_term", trackAmount = 10) {
    spotifyApi
      .getMyTopArtists({ time_range: termState, limit: trackAmount })
      .then(
        (data) => {
          let topArtists = data.body.items;
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
                type: "artist",
              };
            }),
          ]);
        },
        (err) => {
          console.log("Error : .getMe() : ", err);
        }
      );
  }

  function AddOneToRec(trackArtistInfo) {
    const item = { ...trackArtistInfo, showCross: true };
    if (!reccomendationData) {
      setReccomendationData([item]);
    } else {
      if (reccomendationData.find(({ uri }) => uri === item.uri)) return;
      setReccomendationData([...reccomendationData, item]);
    }
  }

  return loading ? (
    <ClipLoader color="#1ed760" loading={loading} size={150} />
  ) : (
    <>
      <Router>
        {/* Navbar Component => User + Searchbar */}
        <Navbar>
          {userData ? (
            <Link to="/">
              <User userData={userData} />
            </Link>
          ) : null}
          <Search
            search={search}
            setSearch={setSearch}
            pickFirstTrack={pickFirstTrack}
            searchResults={searchResults}
            chooseTrack={chooseTrack}
          />
        </Navbar>
        {/* Main Content => REACT ROUTER SWITCH */}
        <Switch>
          {/* Fav Tracks - Route */}
          <Route path="/tracks">
            {topTracksData && topArtistsData ? (
              <ContentContainer>
                <TracksContainer>
                  <ElementContainer
                    type={"tracks"}
                    Link={Link}
                    triggerFillFunction={fillTopTrackData}
                  >
                    {topTracksData.map((track) => (
                      <Track
                        key={track.trackName + Math.floor(Math.random() * 1000)}
                        track={track}
                        chooseTrack={chooseTrack}
                      />
                    ))}
                  </ElementContainer>
                </TracksContainer>
              </ContentContainer>
            ) : null}
          </Route>
          {/* Fav Artist - Route */}
          <Route path="/artists">
            {topTracksData && topArtistsData ? (
              <ContentContainer>
                <TracksContainer>
                  <ElementContainer
                    type={"artists"}
                    Link={Link}
                    triggerFillFunction={fillTopArtistData}
                  >
                    {topArtistsData.map((artist) => (
                      <Artist key={artist.artist} artist={artist} />
                    ))}
                  </ElementContainer>
                </TracksContainer>
              </ContentContainer>
            ) : null}
          </Route>
          {/* Homepage Main - Route */}
          <Route path="/">
            {topTracksData && topArtistsData ? (
              <>
                <ContentContainer>
                  <TracksContainer>
                    <ElementContainer
                      type={"tracks"}
                      triggerFillFunction={fillTopTrackData}
                      Link={Link}
                    >
                      {topTracksData.map((track) => (
                        <Track
                          key={
                            track.trackName + Math.floor(Math.random() * 1000)
                          }
                          track={track}
                          chooseTrack={chooseTrack}
                          AddOneToRec={AddOneToRec}
                        />
                      ))}
                    </ElementContainer>
                    <ElementContainer
                      type={"artists"}
                      Link={Link}
                      triggerFillFunction={fillTopArtistData}
                    >
                      {topArtistsData.map((artist) => (
                        <Artist
                          key={artist.artist}
                          artist={artist}
                          AddOneToRec={AddOneToRec}
                        />
                      ))}
                    </ElementContainer>
                  </TracksContainer>
                  <SuggestionContainer>
                    <SuggestionBuilder
                      reccomendationData={reccomendationData}
                      setReccomendationData={setReccomendationData}
                    />
                  </SuggestionContainer>
                </ContentContainer>
              </>
            ) : null}
          </Route>
        </Switch>
        {/* Spotify Web Player */}
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </Router>
    </>
  );
}
