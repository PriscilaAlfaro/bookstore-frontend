import React from "react";
import Book from "../Book";
import styled from "styled-components";
import { useSelector } from 'react-redux';

import Lottie from "react-lottie";
import animationData from "../../lotties/books-draw.json";
import animationDataNoBook from "../../lotties/no-search-item-available.json";

const BooksMainContainer= styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 4.5rem auto;
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

const BooksContainer = () => {
  const books = useSelector(store => store.books.bookItems);
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

  if (booksInSearch.length > 0 ){
    return (
      <React.Fragment>
        <Results>
        <Text>{ booksInSearch.length} results for your search</Text>
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
  } else if (books.length > 0){
    return (
      <BooksMainContainer>
        {books.map(book => {
          return <Book book={book} key={book._id} />
        })}
      </BooksMainContainer>
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
