import React from "react";
import styled from "styled-components";
import SpotifyLogo from "../Assets/Spotify_Logo_RGB_Green.png";

const LoginContainer = styled.div`
  height: 100vh;
  width: 90vw;
  max-width: 1300px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 150px;
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
  &:hover {
    background-color: #1ed760;
  }
  &:active {
    background-color: #1ed760;
  }
`;

const Logo = styled.img`
  max-width: 30%;
`;

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=790b0e732d4f4ac397b1207b4a54b1da&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <LoginContainer>
      <Logo src={SpotifyLogo} alt="Spotify" />
      <Button>Sign In</Button>
    </LoginContainer>
  );
}
