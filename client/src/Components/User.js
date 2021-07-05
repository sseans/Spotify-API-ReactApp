import React from "react";
import styled from "styled-components";

const UserContainer = styled.div`
  height: fit-content;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 11%;
`;

const UserIcon = styled.div`
  height: 70px;
  width: 70px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 5px;
`;
const UserIconImage = styled.img`
  height: 100%;
`;

const Name = styled.h1`
  color: #eab971;
  font-size: 1.2rem;
`;

const UserName = styled.h3`
  font-size: 0.75rem;
  font-style: italic;
`;

// const Followers = styled.p`
//   font-size: 1rem;
//   margin-top: 2px;
// `;

export default function User({ userData }) {
  return (
    <UserContainer>
      <UserIcon>
        <UserIconImage src={userData.imageUrl} alt={userData.displayName} />
      </UserIcon>
      <Name>{userData.displayName}</Name>
      <UserName>{`@${userData.userName}`}</UserName>
      {/* <Followers>{`${userData.followers} Followers`}</Followers> */}
    </UserContainer>
  );
}
