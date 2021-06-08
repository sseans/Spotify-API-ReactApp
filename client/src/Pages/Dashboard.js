import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth.js";
import SpotifyWebApi from "spotify-web-api-node";
import ClipLoader from "react-spinners/ClipLoader";
import Search from "../Components/Dashboard/Search";
// import styled from "styled-components";

const spotifyApi = new SpotifyWebApi({
  clientId: "790b0e732d4f4ac397b1207b4a54b1da",
});

const tracks = [];

export default function Dashboard({ code }) {
  let [loading, setLoading] = useState(true);
  const accessToken = useAuth(code);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    setLoading(false);
    fillData();
  }, [accessToken]);

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
    <div>
      <Search />
    </div>
  );
}
