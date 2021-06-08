import React, { useState } from "react";
import styled from "styled-components";

const SearchBox = styled.input`
  height: 30px;
  width: 200px;
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

export default function Search({ search, setSearch }) {
  return (
    <div>
      <form>
        <SearchBox
          type="text"
          placeholder="Search Songs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
}
