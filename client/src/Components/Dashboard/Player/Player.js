import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import styled from "styled-components";

const PlayerContainer = styled.div`
  width: 100%;
  height: fit-content;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
`;

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <PlayerContainer>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon={true}
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        styles={{
          activeColor: "#EEC78C",
          bgColor: "#293D3D",
          color: "#EEC78C",
          height: 60,
          sliderTrackBorderRadius: 15,
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#EEC78C",
          trackNameColor: "#fff",
          altColor: "#EEC78C",
        }}
      />
    </PlayerContainer>
  );
}
