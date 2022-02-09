import React from "react";
import styled from "styled-components";

import { useSelector } from 'react-redux';

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import BooksContainer from "../../Components/BooksContainer";
import SearchBar from "../../Components/SearchBar";

import Lottie from "react-lottie";
import animationData from "../../lotties/books-draw.json";

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8rem auto;
  width: 100%;
  @media (min-width: 768px){
    width: 50%;
  }
  @media (min-width: 992px) {
    width: 30%;
  }
`

const SearchBarContainer = styled.div`
  width: 100%;
  margin-top: -1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(0deg, rgba(148,149,153,0.6404936974789917) 32%, rgba(240,240,232,0.24273459383753504) 100%);
`


const Home = () => {
  const booksItems = useSelector(store => store.books.bookItems);
  const booksInSearch = useSelector(store => store.books.searchedItems);

  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
      }
  }

  return (
    <React.Fragment>
      <Header/>
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>
      {(booksItems.length > 0 || booksInSearch.length > 0)  ?
        <BooksContainer/> :
        <ImageContainer>
          <Lottie options={defaultOptions} />
        </ImageContainer>
      }    
      <Footer/>
    </React.Fragment>
  );
}

export default Home;
