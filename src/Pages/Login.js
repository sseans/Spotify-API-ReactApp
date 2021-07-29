import React from "react";
import styled from "styled-components";
import SpotifyLogo from "../Assets/Spotify_Logo_RGB_Green.png";

const LoginContainer = styled.div`
  height: 100vh;
  width: 90vw;
  max-width: 1300px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.a`
  width: 130px;
  height: 30px;
  border-radius: 15px;
  background-color: #1db954;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  border: none;
  letter-spacing: 0.1rem;
  cursor: pointer;
  margin: 30px;
  padding-top: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  &:hover {
    background-color: #1ed760;
  }
  &:active {
    background-color: #199e48;
  }
`;

const Logo = styled.img`
  width: 250px;
`;

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=790b0e732d4f4ac397b1207b4a54b1da&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20playlist-modify-public";

export default function Login() {
  return (
    <LoginContainer>
      <Logo src={SpotifyLogo} alt="Spotify" />
      <Button href={AUTH_URL}>Sign In</Button>
    </LoginContainer>
  );
}
