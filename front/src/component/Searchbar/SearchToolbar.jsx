import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin-top : 10px;
  display : flex;
`
const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 10px 0px 0px 10px;
  width: 100%;
`;
const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  padding: 10px;
  color: black;
  font-size: 1rem;
  line-height: 20px;
  border-radius: 10px 0px 0px 10px;
`;
const ResetIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #aaaaaa;
  font-size: 20px;
  margin-right: 20px;
`;
const IconBox = styled.div`
  width: 100px;
  height: 100%;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3498db;
  border-radius: 0px 10px 10px 0px;
  color: white;
  cursor: pointer;
`;
const SearchIcon = styled(FontAwesomeIcon)`
  color: white;
`;

const SearchToolbar = (props) => {
    const { onSearchValueChange, onSearch, onSearchValueReset, searchValue } = props

    return (
        <SearchContainer>
            <SearchBox>
                <SearchInput
                    type="text"
                    placeholder="Search"
                    value={searchValue}
                    onChange={onSearchValueChange}
                    onKeyDown={onSearch}
                />
                <ResetIcon
                    icon={faTimesCircle}
                    onClick={onSearchValueReset}
                />
            </SearchBox>
            <IconBox id="search" onClick={onSearch}>
                <SearchIcon icon={faSearch} id="search" />
            </IconBox>
        </SearchContainer>
    );
};

export default SearchToolbar;