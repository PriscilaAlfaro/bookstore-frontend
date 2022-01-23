import styled from "styled-components";
import React from "react";
import { useParams, Link } from 'react-router-dom'
import Header from "../../Components/Header";
import Counter from "../../Components/Counter";
import { useSelector } from 'react-redux';
import  NotFound from '../NotFound';
import { Loader } from "../../Components/Loader";
import moment from "moment";

const Container= styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem auto;
  justify-content: center;
  width: 80%;
  background-color: white;
`
const Up= styled.div`
  background: lightpink;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  justify-content: flex-start;
  @media (min-width: 768px){
    flex-direction: row;
    width: 100%
  }
`

const CardImage= styled.img`
  width: 30%;
  height: auto;
  margin: 10px 20px;
`

const BookDetailsContainer= styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 30px;
  
`

const Details= styled.p`
  display: flex;
  flex-direction: column;
  color: gray;
  margin: 5px;
`

const Synopsis= styled.div`
  display: flex;
  background: yellow;
  flex-direction: column;
  @media (min-width: 768px){
    width: 100%;
  }

`
const Title= styled.h1`
  font-size: 2rem;
`

const SubTitle= styled.h2`
  font-size: 1rem;
`

const Text= styled.p`
  font-size: 1rem;
`


const AddToCardButton = styled.button`
  color: white;
  background: rgb(186, 201, 100);
  border: none;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 0.8rem;
  @media (min-width: 768px){
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    font-size: 1.3rem;
  }
`

const Icons= styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`


const BookDetails = () =>{
  const { id } = useParams();
  const books = useSelector(store => store.books.bookItems);
  let bookDetails={} 

 
    if (id) {
      bookDetails = books.find(book => book._id === id)
    } else {
      return <NotFound />
    }
  

  if (!bookDetails) {
    return (< Loader />)
  }

    return (
        <>
            <Header/>
        <Link to={"/"}><i className="fas fa-chevron-circle-left">Return</i></Link>
        <Container>
            <Up>
            <CardImage src={bookDetails.thumbnailUrl} alt="card patron"/>
            <BookDetailsContainer>
              <Title>{bookDetails.title}</Title>
              <Details>Author: {bookDetails.authors.map(author=> author)}</Details>
              <Details>Published: {moment(bookDetails.publishedDate).format('LL')}</Details>
              <Details>Categories: {bookDetails.categories.map(cat=>cat)}</Details>
              <Details>Language: {bookDetails.language}</Details>
              <Details>Pages: {bookDetails.pageCount}</Details>
              <Details>Isbn: {bookDetails.isbn}</Details>
              <Details>Availability: {bookDetails.availability}</Details>
              <SubTitle>Price: ${bookDetails.price}</SubTitle>
                <Counter/>
                <Icons>
                <AddToCardButton><i className="fas fa-shopping-cart"></i> Add to cart</AddToCardButton>
                <AddToCardButton><i className="fas fa-heart"></i></AddToCardButton>
                </Icons>
            </BookDetailsContainer>
            </Up>

            <Synopsis>
                <SubTitle>Synopsis:</SubTitle>
            <Text>{bookDetails.longDescription}</Text>
            </Synopsis>
        </Container>
        </>
    );
}

export default BookDetails;