import styled from "styled-components";
import React from "react";
import moment from "moment";

import Header from "../../Components/Header";
import Counter from "../../Components/Counter";
import NotFound from '../NotFound';

import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom'

import { addItemToCart } from "../../managers/cartManager";
import { Loader } from "../../Components/Loader";
import { cart } from "../../reducers/cart";


const Container= styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem auto;
  justify-content: center;
  width: 80%;
  background-color: white;
`
const Up= styled.div`
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
  width: 230px;
  height: auto;
  padding: 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (min-width: 768px){
    width: 250px;
  }
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
  background: linear-gradient(0deg, rgba(79,238,148,0.11528361344537819) 28%, rgba(197,233,94,0.14237570028011204) 100%);
  flex-direction: column;
  margin-top: 2rem;
  padding: 20px;
  @media (min-width: 768px){
    width: 100%;
  }

`
const Title= styled.h1`
  font-size: 2rem;
`
const SubTitle= styled.h2`
  font-size: 1rem;
  margin: 1rem 5px;
`
const Text= styled.p`
  font-size: 1rem;
`
const AddButton = styled.button`
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
  margin: 0;
`
const CounterWrapper = styled.div`
  display: flex;
  margin: 1rem 0;
`


const BookDetails = () =>{
  const { id } = useParams();
  // const dispatch = useDispatch();

  const books = useSelector(store => store.books.bookItems);
  const itemsInCart = useSelector(store => store.cart.items);
  const item = itemsInCart?.find(item => item.productId === id);
  // const userId = useSelector(store => store.user.id);

  let bookDetails = {}; 

  if (id) {
    bookDetails = books.find(book => book._id === id);
  } else {
    return <NotFound />
  }
  
  if (!bookDetails) {
    return (< Loader />);
  }


    return (
      <React.Fragment>
        <Header/>
        <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
        <Container>
          
          <Up>
            <CardImage src={bookDetails.thumbnailUrl} alt="card patron"/>
            <BookDetailsContainer>
              <Title>{bookDetails.title}</Title>
              <Details>Author: {bookDetails.authors.map(author=> author)}</Details>
              <Details>Published: {moment(bookDetails.publishedDate).format('LL') || "No details available"}</Details>
              <Details>Categories: {bookDetails.categories.length > 0 ? bookDetails.categories.map(cat=>cat) : "No categories available"}</Details>
              <Details>Language: {bookDetails.language}</Details>
              <Details>Pages: {bookDetails.pageCount || "No details available"}</Details>
              <Details>Isbn: {bookDetails.isbn}</Details>
              <Details>Availability: {bookDetails.availability}</Details>
              <SubTitle>Price: ${bookDetails.price}</SubTitle>
              <CounterWrapper>
                <Counter quantity={(item && item.quantity) || 0} productId={bookDetails._id} />
              </CounterWrapper>
              <Icons>
                <AddButton><i className="fas fa-heart"></i>Add to wishlist</AddButton>
              </Icons>
            </BookDetailsContainer>
          </Up>

          <Synopsis>
            <SubTitle>Synopsis:</SubTitle>
            <Text>{(bookDetails.longDescription && bookDetails.longDescription) || 
            (bookDetails.shortDescription && bookDetails.shortDescription) || 
            "There is no sinopsis available"}</Text>
          </Synopsis>

        </Container>
        </React.Fragment>
    );
}

export default BookDetails;