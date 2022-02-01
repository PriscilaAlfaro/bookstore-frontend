import React from "react";
import Book from "../Book";
import styled from "styled-components";
import { useSelector } from 'react-redux';

import Lottie from "react-lottie";
import animationData from "../../lotties/books-draw.json";

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
  margin: 0 auto;
  width: 50%;
  @media (min-width: 768px){
    width: 40%;
  }
  @media (min-width: 992px) {
    width: 30%;
  }
`

const BooksContainer= () => {
    const books = useSelector(store => store.books.bookItems);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    
    return (
        <BooksMainContainer>
            {books ? 
            books.map(book => { 
                return <Book book={book} key={book._id}/>}) : 
                <ImageContainer>
                    <Lottie options={defaultOptions} />
                </ImageContainer>
                
                }
        </BooksMainContainer>
    );
}

export default BooksContainer;
