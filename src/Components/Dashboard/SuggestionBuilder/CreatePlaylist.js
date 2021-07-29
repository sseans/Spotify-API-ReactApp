import React, { useState } from "react";
import styled from "styled-components";

const MakePlaylistContainer = styled.div`
  width: 100%;
  height: fit-content;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MakePlaylistButton = styled.button`
  width: fit-content;
  min-width: fit-content;
  padding: 0 10px;
  height: 30px;
  border-radius: 15px;
  background-color: #1db954;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  border: none;
  letter-spacing: 0.1rem;
  cursor: pointer;
  /* margin: 0 0 15px 0; */
  padding-top: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  text-decoration: none;
  &:hover {
    background-color: #1ed760;
  }
  &:active {
    background-color: #199e48;
  }
`;

const MakePlaylistInstructionText = styled.div`
  font-size: 0.7rem;
  padding-top: 15px;
  font-weight: bold;
  text-align: center;
`;

const MakePlaylistInfo = styled.form`
  .padding {
    padding-top: 15px;
  }
`;

const MakePlaylistTextContainer = styled.div`
  display: flex;
  width: 210px;
`;

const MakePlaylistText = styled.h3`
  font-size: 0.6rem;
  padding-top: 4px;
  color: #93b7be;
  flex: 30%;
`;

const MakePlaylistInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #93b7be;
  margin: 0 5px;
  height: 15px;
  color: white;
  font-size: 0.7rem;
  :focus {
    outline: none;
  }
`;

const SubmitButton = styled(MakePlaylistButton)`
  height: 24px;
  background-color: #93b7be;
  font-size: 0.7rem;
  margin-top: 20px;
`;

export default function CreatePlaylist({ addReccomendationsToPlaylist }) {
  const [showPlaylistInfo, setShowPlaylistInfo] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");

  return (
    <MakePlaylistContainer>
      <MakePlaylistButton
        onClick={() => setShowPlaylistInfo(!showPlaylistInfo)}
      >
        Make Into A Playlist
      </MakePlaylistButton>
      {showPlaylistInfo ? (
        <>
          <MakePlaylistInfo>
            <MakePlaylistTextContainer className="padding">
              <MakePlaylistText>Playlist Name:</MakePlaylistText>
              <MakePlaylistInput
                type="text"
                name="Playlist Name"
                id="playlist_name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </MakePlaylistTextContainer>
            <MakePlaylistTextContainer>
              <MakePlaylistText>Description:</MakePlaylistText>
              <MakePlaylistInput
                type="text"
                name="Playlist Description"
                id="playlist_desc"
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
              />
            </MakePlaylistTextContainer>
          </MakePlaylistInfo>
          <SubmitButton
            onClick={() => {
              if (!nameInput) return;
              addReccomendationsToPlaylist(nameInput, descInput);
            }}
          >
            Submit
          </SubmitButton>
        </>
      ) : (
        <MakePlaylistInstructionText>
          Check your spotify account after submitting!
        </MakePlaylistInstructionText>
      )}
    </MakePlaylistContainer>
  );
}
