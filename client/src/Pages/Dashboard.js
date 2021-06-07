import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth.js";
import SpotifyWebApi from "spotify-web-api-node";
import ClipLoader from "react-spinners/ClipLoader";
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
        console.log(`name`, data.body.items[0].track.name);
        console.log(`artist`, data.body.items[0].track.artists[0].name);
      },
      (err) => {
        console.log("Something went wrong!", err);
      }
    );
  }

  console.log("Dashboard Rendered");

  return loading ? (
    <ClipLoader color="#1ed760" loading={loading} size={150} />
  ) : (
    <div>hello</div>
  );
}
