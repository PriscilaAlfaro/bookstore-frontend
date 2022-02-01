import React, {useState} from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  font-family: Roboto;
  display: flex;
  margin: 1.5rem auto;
  width: 80%;
  height: 50px;

`

const SearchBarInput = styled.input`
  background-color: D1D4C9
  font-size: 1.1rem;
  width: 80%;
  border-radius: 8px 0 0 8px;
  border: none;
  padding-left: 10px;
  color: rgb(51, 71, 86);
  &:focus {
    outline: none;
    border: 1px solid cadetblue;
  }
`

const SearchBarButton = styled.button`
    background: rgb(67, 138, 94);
    font-size: 0.8rem;
    align-items: center;
    text-align: center;
    display: flex;
    justify-content: center;
    color: white;
    width: 50px;
     border-radius:  0 8px 8px 0 ;
    cursor: pointer;
  border: none;
`

const SearchBarOutput = styled.div`
    justify-content: center;
    text-align: center;
    display: flex;
    width: 80%;
    margin: 0 auto;
    min-height: 30px;
    font-size: 15px;
`

const SearchBar = () => {
    const [search, setSearch]= useState("");

    const onChange = (e) => {
        const inputValue = e.target.value;
        setSearch(inputValue)
    }

    return (
        <>
            <SearchBarContainer>
                <SearchBarInput
                    placeholder="Search..."
                    type="text"
                    onChange={onChange}
                    value={search}
                />
                <SearchBarButton ><i className="fas fa-search"></i></SearchBarButton>
            </SearchBarContainer>
            <SearchBarOutput>Search output: {search}</SearchBarOutput>
        </>
    );
}

export default SearchBar;