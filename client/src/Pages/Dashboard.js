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
  background-color: var(--very-dark-green);
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 70px;
  padding-top: 0px;
  height: calc(100vh - 134px);
  overflow-y: auto;
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: flex-start;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: var(--dark-slate-green);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #213131;
    border: 3px solid var(--dark-slate-green);
    border-radius: 10px;
  }
`;

const TracksContainer = styled.div`
  margin: auto;
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
    padding: 0px 15px 5px 15px;
  }
`;

const SuggestionContainer = styled.div`
  margin: auto;
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
    padding: 0px 15px 60px 15px;
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
  const [reccomendations, setReccomendations] = useState();

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
    fillTopArtistData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // Search useffect => when something is typed in the search input
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    // let cancel makes sure the search isnt searched for every single character typed
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      let searchResultArray = res.body.tracks.items;
      // Builds {} array with useful data => add to search results state
      buildTrackObjects(searchResultArray).then((trackObjects) => {
        setSearchResults(trackObjects);
      });
    });
    return () => (cancel = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Get favourite tracks from spotify => create an {} array => set to state
  function fillTopTrackData(termState = "long_term", trackAmount = 10) {
    spotifyApi
      .getMyTopTracks({ time_range: termState, limit: trackAmount })
      .then(
        (data) => {
          let topTracks = data.body.items;
          // Builds the array of objects with useful data => add to state
          buildTrackObjects(topTracks).then((trackObjects) => {
            setTopTracksData(trackObjects);
          });
        },
        (err) => {
          console.log("Error in FillTopTracks() : ", err);
        }
      );
  }

  // Get favourite artists from spotify => create an {} array => set to state
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
                type: artist.type,
              };
            }),
          ]);
        },
        (err) => {
          console.log("Error : .getMe() : ", err);
        }
      );
  }

  // Add one track to reccomendation state
  function addOneToRec(trackArtistInfo) {
    // Add a value (showcross) to the object used in reccomendation component
    const item = { ...trackArtistInfo, showCross: true };
    if (!reccomendationData) {
      // if array is empty add first item
      setReccomendationData([item]);
    } else {
      // Limits the array to 5 => Stops duplicates by uri => set state with new item
      if (reccomendationData.length >= 5) return;
      if (reccomendationData.find(({ uri }) => uri === item.uri)) return;
      setReccomendationData([...reccomendationData, item]);
    }
  }

  // Remove one track from reccomendation state
  function removeOneFromRec(trackArtistInfo) {
    setReccomendationData(
      reccomendationData.filter((item) => item.uri !== trackArtistInfo.uri)
    );
  }

  // Use seed tracks & artists => Create list of 20 tracks from that
  function fillReccomendations() {
    if (!reccomendationData) return;
    // Filters out non 'artist' items => removes everything but the item.id
    let seedArtistData = reccomendationData
      .filter((item) => item.type === "artist")
      .map((item) => item.id);
    // Filters out non 'track' items => removes everything but the item.id
    let seedTrackData = reccomendationData
      .filter((item) => item.type === "track")
      .map((item) => item.id);
    // Makes api request
    spotifyApi
      .getRecommendations({
        min_energy: 0.4,
        seed_artists: seedArtistData,
        seed_tracks: seedTrackData,
        min_popularity: 50,
      })
      .then(
        // Modifies response data and sets to state
        (data) => {
          let tracks = data.body.tracks;
          // Builds the array of objects with useful data => add to state
          buildTrackObjects(tracks).then((trackObjects) => {
            setReccomendations(trackObjects);
          });
        },
        (err) => {
          console.log("Error : .getMe() : ", err);
        }
      );
  }

  function addReccomendationsToPlaylist(name, desc) {
    // Create playlist
    spotifyApi
      .createPlaylist(name, {
        description: desc,
        collaborative: false,
        public: true,
      })
      .then(
        (data) => {
          let playlistID = data.body.id;
          // Object destructure to return an array of just the track uri's
          let tracksArray = reccomendations.map(({ uri }) => uri);
          // Add songs to created playlist
          spotifyApi.addTracksToPlaylist(playlistID, tracksArray);
        },
        (err) => {
          console.log("Error: addRecToPlaylist", err);
        }
      );
  }

  function markIfTracksAreLiked(arrayOfTracks) {
    return new Promise((resolve, reject) => {
      let arrayOfIDs = arrayOfTracks.map(({ id }) => id);
      spotifyApi.containsMySavedTracks(arrayOfIDs).then(
        (data) => {
          let isLikedArray = data.body;
          console.log(isLikedArray);
          let markedArray = arrayOfTracks.map((track, indexofTrack) => {
            isLikedArray.map((value, indexOfLike) => {
              if (indexofTrack !== indexOfLike) return value;
              if (value === true) track.liked = true;
              if (value === false) track.liked = false;
              return value;
            });
            return track;
          });
          if (markedArray) {
            resolve(markedArray);
          } else {
            reject("Error: Marking Array with likes failed");
          }
        },
        (err) => {
          console.log("Error: addRecToPlaylist", err);
        }
      );
    });
  }

  async function buildTrackObjects(trackArray) {
    try {
      // Promise returns original array but with like values
      const markedTrackArray = await markIfTracksAreLiked(trackArray);
      // Start building the array of objects with specific track data
      const trackObjectsArray = markedTrackArray.map((track) => {
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
          id: track.id,
          duration: trackDuration.join(":"),
          type: track.type,
          liked: track.liked,
        };
      });
      // Returns Array of objects wrapped in a promise (So it can be processed asynchronously)
      return trackObjectsArray;
    } catch {
      return console.log("Error in buildTrackObjects");
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
            addOneToRec={addOneToRec}
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
                          addOneToRec={addOneToRec}
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
                          addOneToRec={addOneToRec}
                        />
                      ))}
                    </ElementContainer>
                  </TracksContainer>
                  {/* Reccomendations */}
                  <SuggestionContainer>
                    <SuggestionBuilder
                      reccomendationData={reccomendationData}
                      setReccomendationData={setReccomendationData}
                      removeOneFromRec={removeOneFromRec}
                      fillReccomendations={fillReccomendations}
                      reccomendations={reccomendations}
                      chooseTrack={chooseTrack}
                      addReccomendationsToPlaylist={
                        addReccomendationsToPlaylist
                      }
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
