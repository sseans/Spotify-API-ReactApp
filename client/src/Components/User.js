// import React from "react";
import styled from "styled-components";

const UserContainer = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* position: fixed; */
  /* top: 60px; */
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

// const Name = styled.h1`
//   color: #dce7e5;
//   font-size: 1.2rem;
// `;

// const UserName = styled.h3`
//   font-size: 0.65rem;
//   font-style: italic;
// `;

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
      {/* <Name>{userData.displayName}</Name> */}
      {/* <UserName>{`@${userData.userName}`}</UserName> */}
      {/* <Followers>{`${userData.followers} Followers`}</Followers> */}
    </UserContainer>
  );
}
