import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import moment from "moment";

import Header from "../../Components/Header";
import NotFound from '../NotFound';

import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom'

// import { addItemToCart } from "../../managers/cartManager";
import { addItemToWishList } from "../../managers/wishManager";
import { getBookByIdFromDataBase } from "../../managers/bookManager";
import { Loader } from "../../Components/Loader";
// import { cart } from "../../reducers/cart";
import { wishlist } from "../../reducers/wishlist";
import { readCookie } from "../../utils/cookies";
import { books } from "../../reducers/books";
import { addItemToCart } from "../../managers/cartManager";
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
  &:hover {
    filter: brightness(0.90);
  }
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

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const booksItems = useSelector(store => store.books.bookItems);
  const booksItemsFromSearch = useSelector(store => store.books.searchedItems);
  const userIdFromCookie = readCookie("id");
  const wishlistItems = useSelector(store => store.wishlist.items);

  const bookInWishlist = wishlistItems?.find(item => id === item.productId);
  console.log(bookInWishlist);

  const booksError = useSelector(store => store.books.error);
 
  let bookDetails = null; 

  if (id) {
    bookDetails = booksItems.find(book => book._id === id) || booksItemsFromSearch.find(book => book._id === id);
  } else {
    return <NotFound />
  }


  const addNewItemToWishList = () => {
    if (!userIdFromCookie) {
      navigate('/register');
    } else {
      addItemToWishList(id, userIdFromCookie).then(addItemToWishResponse => {
        if (addItemToWishResponse.success) {
          dispatch(wishlist.actions.setWishlist(addItemToWishResponse.response));
          dispatch(wishlist.actions.setError(null));
        } else {
          dispatch(wishlist.actions.setWishlist([]));
          dispatch(wishlist.actions.setError(addItemToWishResponse.response));
        }

      })
    }
  }

  const addNewItemToCart = async() => {
    if (!userIdFromCookie) {
      navigate('/register');
    } else {
      addItemToCart(id, userIdFromCookie).then(addItemToCartReponse=>{
        if (addItemToCartReponse.success) {
          dispatch(cart.actions.setCart(addItemToCartReponse.response));
          dispatch(cart.actions.setError(null));

        } else {
          dispatch(cart.actions.setCart([]));
          dispatch(cart.actions.setError(addItemToCartReponse.response));
          throw new Error('Error adding item to cart')

        }
      });
    }
  }

  if (!bookDetails) {
    return (
      <Up>
        <Loader/>
      </Up>
    );
  }


    return (
      <React.Fragment>
        <Header/>
        <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
        <Container>
          
         { bookDetails && (
           <React.Fragment>
              <Up>
                <CardImage src={bookDetails.thumbnailUrl} alt={bookDetails.title}/>
                  <BookDetailsContainer>
                    <Title>{bookDetails.title}</Title>
                  <Details>Author: {bookDetails.authors?.map(author => author).join(', ') || "No details available"}</Details>
                    <Details>Published: {moment(bookDetails.publishedDate).format('LL') || "No details available"}</Details>
                  <Details>Categories: {bookDetails.categories?.length > 0 ? bookDetails.categories?.map(cat => cat).join(', ') : "No categories available"}</Details>
                  <Details>Language: {bookDetails.language || "No details available"}</Details>
                    <Details>Pages: {bookDetails.pageCount || "No details available"}</Details>
                  <Details>Isbn: {bookDetails.isbn || "No details available"}</Details>
                  <Details>Availability: {bookDetails.availability || "No details available"}</Details>
                  <SubTitle>Price: ${bookDetails.price || "No details available"}</SubTitle>
    
                    <Icons>
                      <AddButton onClick={addNewItemToCart}><i className="fas fa-shopping-cart"></i>Add to cart</AddButton>
                    <AddButton onClick={addNewItemToWishList} disabled={bookInWishlist}><i className="fas fa-heart"></i>{bookInWishlist ? "Already in wishlist" : "Add to wishlist"}</AddButton>
                    </Icons>
                  </BookDetailsContainer>
                </Up>

                <Synopsis>
                  <SubTitle>Synopsis:</SubTitle>
                  <Text>{(bookDetails.longDescription && bookDetails.longDescription) || 
                  (bookDetails.shortDescription && bookDetails.shortDescription) || 
                  "There is no sinopsis available"}</Text>
                </Synopsis>
            </React.Fragment>)
          }
          {booksError && booksError}
        </Container>
        </React.Fragment>
    );
}

export default BookDetails;