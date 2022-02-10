import React from 'react';
import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'

import { cart } from '../../reducers/cart';
import { readCookie, createCookie } from '../../utils/cookies';
import { addItemToCart } from '../../managers/cartManager';


const Container= styled.section`
  width: 180px;
  height: auto;
  margin: 1.5rem;
  text-align: center;
  box-sizing: border-box;
`

const ImageContainer= styled.div`
  position: relative;
  cursor: pointer;
`

const CardImage= styled.img`
  width: 180px;
  height: 230px;
  z-index: 0;
`

const Overlay= styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.75);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 3;
  box-sizing: border-box;
  ${Container}:hover & {
    display: flex;
  }
`

const Details= styled.p`
  cursor: pointer;
  font-size: 20px;
  filter: invert(1);
  &:hover {
    transform: scale(1.2);
  }
`

const AddToCartButton= styled.button`
  cursor: pointer;
  font-size: 1rem;
  background-color: rgb(67, 111, 138);
  width: 100%;
  height: 30px;
  border: none;
  color: azure;
  margin: 10px auto;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background-color: green;

  }
  &:disabled {
    opacity: 0.5;
  }
  &:active {
    box-shadow: 0 0 8px green;
  }
`

const CardTitle = styled.h1`
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  color: black;
  text-align: left;
  margin: 0;
`

const CardSubTitle = styled.h2`
  color: gray;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  text-align: left;
  margin: 0;
`

const BookInfo = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  width: 100%;
  color: black;
  margin: 0;
  text-align: left;
`

const Book = ({book}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userIdFromCookie = readCookie("id");
  const cartIdFromCookie = readCookie("cartId");
  const accessTokenFromCookie = readCookie("accessToken");

  const cartItems = useSelector(store => store.cart.items);
  const bookInCart = cartItems?.find(item => book._id === item.productId);


  //Keep it as example of async-await function 
  const handleAddToCartFromHome = async () => {
    if (accessTokenFromCookie && userIdFromCookie ){ 
      const addItemToCartReponse = await addItemToCart(book._id, userIdFromCookie);
      const newCart = addItemToCartReponse.response;

      if (addItemToCartReponse.success) {
        dispatch(cart.actions.setCart(newCart));
        cartIdFromCookie === "undefined" &&  createCookie("cartId", newCart._id);
      } else {
        throw new Error('Error adding item to cart')
      }

    } else {
      dispatch(cart.actions.setTemporalItem({productId: book._id}));
      navigate('/register');
    }
    
  }

  if(book){
    return (
        <Container>
          <Link style={{ textDecoration: 'none' }} to={`/bookDetails/${book._id}`}>
          <ImageContainer>
            <CardImage src={book.thumbnailUrl} alt={book.title}/>
            <Overlay>
            <Details>More details</Details>
            </Overlay>
          </ImageContainer>
          </Link> 
        <AddToCartButton onClick={handleAddToCartFromHome} disabled={bookInCart} style={bookInCart && { backgroundColor: "green" }}>{bookInCart ? " Already in cart" : " Add to cart"}</AddToCartButton>
          <CardTitle >{book.title}</CardTitle>
          <CardSubTitle>{book.authors.map(author => author)}</CardSubTitle>
          <BookInfo>Price: {book.price} Kr</BookInfo>
        </Container>
    );
  }
}


export default Book;
