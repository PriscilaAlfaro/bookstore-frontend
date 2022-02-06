import React from "react";
import styled from "styled-components";

import { useSelector } from 'react-redux';

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import BooksContainer from "../../Components/BooksContainer";

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

const Home = () =>{
    const books = useSelector(store => store.books.bookItems);
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
            {(books.length > 0 || booksInSearch.length > 0)  ? <BooksContainer/> :
                <ImageContainer>
                    <Lottie options={defaultOptions} />
                </ImageContainer>
             }          
            <Footer/>
        </React.Fragment>
    );
}

export default Home;
