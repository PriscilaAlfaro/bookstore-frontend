import React, { useEffect } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Header from "../../Components/Header";
import Counter from "../../Components/Counter";

import { cart } from "../../reducers/cart";
import { API_URL } from '../../utils/url';
import { readCookie } from "../../utils/cookies";

const Container= styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
  justify-content: center;
  width: 95%;
  flex-direction: column;
  @media (min-width: 768px){
    flex-direction: row;
  }
`

const ItemDetails= styled.div`
  background: linear-gradient(0deg, rgba(79,172,238,0.20960259103641454) 28%, rgba(197,233,94,0.14237570028011204) 100%);
  display: block;
  margin: 0 auto;
`

const CardImage= styled.img`
  width: 10%;
  height: auto;
  margin: 10px auto;
  @media (min-width: 768px){
  margin: 10px 20px;
  }
`

const BookDetailsContainer= styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px auto;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  @media (min-width: 768px){
     justify-content: space-around;
  }

`
const TextTitle = styled.div`
  margin: auto 10px;
  font-size: 0.7rem;
  max-width: 100px;
  @media (min-width: 768px){
    width: 300px;
    font-size: 1rem;
    width: 200px;
  }
`
const Text= styled.h2`
  font-size: 0.7rem;
  margin: 0.1rem;
   @media (min-width: 768px){
      font-size: 1rem;
       margin: 0 1rem;
  }
`

const DeleteButton = styled.button`
  color: white;
  background: rgb(85, 110, 83);
  border: none;
  padding: 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  margin: 8px;
  @media (min-width: 768px){
    font-size: 1rem;
    margin-right: 1rem;
    margin-left: 2rem;
    padding: 10px;
  }
`

const Checkout = styled.div`
  heigth: 500px;
  width: 80%;
  display: block;
  margin: 1rem;

  @media (min-width: 768px){
    width: 50%;
  }
`

const Image = styled.img`
  width: 80%;
`

const Cart = () => {
  const itemsInCart = useSelector(store => store.cart.items);
  const cartId = readCookie("cartId");
  const userId = readCookie("id");
  const accessToken = readCookie("accessToken");

  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      }
    }

    if (userId && accessToken && cartId !== "undefined") {

      fetch(API_URL(`carts/${userId}/userId`), options)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.success) {
            dispatch(cart.actions.setCart(data.response));
            dispatch(cart.actions.setError(null));
          } else {
            dispatch(cart.actions.setCart([]));
            dispatch(cart.actions.setError(data.response));
          }
        }).catch((error) => {
          console.log('Error in Fetch:' + error.message);
        });
    }
    
  }, [accessToken, cartId, dispatch, userId]);

const deleteBookFromCart = (productId)=>{
  dispatch(cart.actions.removeSpecificItemFromCart({productId}));
}

  

    return (
        <React.Fragment>
        <Header/>
        <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
            <Container>
              <ItemDetails>
              {!itemsInCart && "sorry no hay items en este cart"}
              {itemsInCart && itemsInCart.map(item=>{
              return(
              <BookDetailsContainer key={item.productId}>
                <CardImage src={item.url} alt={item.title} />
                <TextTitle>{item.title}</TextTitle> 
                <Text>Price: ${item.price}</Text>
                <Counter quantity={item.quantity} productId={item.productId}/>
                <DeleteButton onClick={() => deleteBookFromCart(item.productId)}><i className="fas fa-trash"></i></DeleteButton>
              </BookDetailsContainer>
            )})}
                </ItemDetails>
          <Checkout>
            <TextTitle>Checkout</TextTitle>
          <Image src= "./assets/keyboard.jpeg" alt= "keyboard"/>

          </Checkout>
            </Container>
        </React.Fragment>
    );
}

export default Cart;