import React from "react";
import styled from "styled-components";

const UserContainer = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const UserIcon = styled.div`
  height: 30px;
  width: 30px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 0 0 20px;
  cursor: pointer;
`;
const UserIconImage = styled.img`
  height: 100%;
`;

export default function User({ userData }) {
  return (
    <UserContainer>
      <UserIcon>
        <UserIconImage src={userData.imageUrl} alt={userData.displayName} />
      </UserIcon>
    </UserContainer>
  );
}
