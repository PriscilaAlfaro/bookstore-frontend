import React, {useState} from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';

import { searchBooksFromDataBase } from '../../managers/bookManager';
import { books } from '../../reducers/books';


const SearchBarContainer = styled.div`
  font-family: Roboto;
  display: flex;
  margin: 10px auto;
  width: 80%;
  height: 30px;
  justify-content: center;
  @media (min-width: 768px){
    height: 35px;
    width: 90%;
  }
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
  @media (min-width: 768px){
    width: 60%;
  }
  @media (min-width: 992px) {
    width: 40%;
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
  &:hover {
    filter: brightness(0.90);
  }
`


const SearchBar = () => {
  const dispatch = useDispatch();
  const [userInput, setUserInput]= useState("");

  const onChange = (e) => {
    const inputValue = e.target.value;
    setUserInput(inputValue)
  }

 
  const searchBooksInDataBase = () => {
    searchBooksFromDataBase(userInput).then(data => {
        if (data.success) {
          dispatch(books.actions.setBookSearch(data.response));
          dispatch(books.actions.setError(null));
        } else {
          dispatch(books.actions.setBookSearch([]));
          dispatch(books.actions.setError(data.response));
        }
      }).catch((error) => {
        console.log('Error in Fetch:' + error.message);
      });
  }

    return (
      <React.Fragment>
        <SearchBarContainer>
          <SearchBarInput
              placeholder="Search..."
              type="text"
              onChange={onChange}
              value={userInput}
              onKeyPress={e => {
              if (e.key === "Enter") {
                searchBooksInDataBase();}
          }}/>
          <SearchBarButton onClick={searchBooksInDataBase}><i className="fas fa-search"></i></SearchBarButton>
        </SearchBarContainer>
      </React.Fragment>
    );
}


export default SearchBar;
