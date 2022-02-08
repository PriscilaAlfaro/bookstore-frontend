import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import Book from "../Book";
import { books } from "../../reducers/books";
import { getBooksFromDataBase } from '../../managers/bookManager';

import Lottie from "react-lottie";
import animationData from "../../lotties/books-draw.json";
import animationDataNoBook from "../../lotties/no-search-item-available.json";

const BooksMainContainer= styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
  text-decoration: none;
`
const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem auto;
  width: 50%;
  @media (min-width: 768px){
    width: 40%;
  }
  @media (min-width: 992px) {
    width: 30%;
  }
`
const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;

`
const Text = styled.p`
  font-size: 1rem;
  color: gray;
  margin: 0 auto;
  @media(min - width: 768px) {
      font - size: 1.3rem;
  }
`
const ButtonLoad = styled.button`
  color: white;
  background: rgb(110, 203, 99);
  border: none;
  padding: 10px;
  margin: 1rem auto;
  border-radius: 10px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 0.8rem;
  text-decoration: none;
  cursor: pointer;
  @media (min-width: 768px){
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    font-size: 1.3rem;
  }
`
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
`

const BooksContainer = () => {
  const dispatch = useDispatch();
  const booksItems = useSelector(store => store.books.bookItems);
  const booksInSearch = useSelector(store => store.books.searchedItems);
  const error = useSelector(store => store.books.error);
  
  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
      }
  }

  const noResultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationDataNoBook,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  const hadleGetMoreBooks = () => {
    getBooksFromDataBase(booksItems).then(data => {
      if (data.success) {
        const newArray = [...booksItems, ...data.response]
        dispatch(books.actions.setBooks(newArray));
        dispatch(books.actions.setError(null));

      } else {
        dispatch(books.actions.setBooks([]));
        dispatch(books.actions.setError(data.response));
      }
    }).catch((error) => {
      console.log('Error in Fetch:' + error.message);
    });
  }
  if (booksInSearch.length > 0 ){
    return (
      <React.Fragment>
        <Results>
        <Text>{booksInSearch.length} results for your search</Text>
        </Results>
        <BooksMainContainer>
          {booksInSearch.map(book => {
            return <Book book={book} key={book._id} />
          })} 
        </BooksMainContainer>
      </React.Fragment>
    )

  } else if (error !== null) {
    return (
      <React.Fragment>
        <Results>
          {error && <Text>Results of the search : 0 </Text>}
        </Results>
        <BooksMainContainer>
          <ImageContainer>
            <Lottie options={noResultOptions} />
          </ImageContainer>
        </BooksMainContainer>
      </React.Fragment>
    )
  } else if (booksItems.length > 0){
    return (
      <React.Fragment>
          <BooksMainContainer>
              {booksItems.map(book => {
              return <Book book={book} key={book._id} />
            })}
          <ButtonContainer>
            <ButtonLoad onClick={hadleGetMoreBooks}>See more books</ButtonLoad>
          </ButtonContainer>
          </BooksMainContainer>

      </React.Fragment>
    )
  } else{
    (
      <BooksMainContainer>
        <ImageContainer>
          <Lottie options={defaultOptions} />
        </ImageContainer>
      </BooksMainContainer>
    )
  }
}

export default BooksContainer;
