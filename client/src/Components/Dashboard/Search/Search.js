import React from "react";
import styled from "styled-components";

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
  display: flex;
  justify-content: center;
`;

export default function Search({ search, setSearch }) {
  return (
    <div>
      <form>
        <SearchContainer>
          <SearchBox
            type="text"
            placeholder="Search Songs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>
      </form>
    </div>
  );
}
