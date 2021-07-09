import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 99;
`;

const FormWrapper = styled.form`
  width: 100%;
`;

const SearchBox = styled.input`
  height: 30px;
  width: 100%;
  border-radius: 15px;
  background-color: #fff;
  border: none;
  font-size: 1rem;
  padding: 0 12.5px;
  &::placeholder {
    font-size: 1rem;
  }
  &:focus {
    outline: none;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  /* padding: 0 15px; */
  display: flex;
  justify-content: center;
`;

export default function Search({ search, setSearch, pickFirstTrack }) {
  return (
    <Wrapper>
      <FormWrapper
        onSubmit={(e) => {
          e.preventDefault();
          pickFirstTrack();
        }}
      >
        <SearchContainer>
          <SearchBox
            type="text"
            placeholder="Search Songs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>
      </FormWrapper>
    </Wrapper>
  );
}
