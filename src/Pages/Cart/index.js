import React, { useEffect } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Header from "../../Components/Header";
import Counter from "../../Components/Counter";
import PrePurchaseSalesOrder from "../../Components/PrePurchaseSalesOrder";

import { cart } from "../../reducers/cart";
import { salesOrder } from "../../reducers/salesOrder";
import { API_URL } from '../../utils/url';
import { readCookie } from "../../utils/cookies";
import { removeItemFromCart } from "../../managers/cartManager";
import { createOrderInKlarna } from "../../managers/checkoutManager";
import Footer from "../../Components/Footer";


const ContainerItems= styled.section`
  // background: hotpink;
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto;
  justify-content: center;
  width: 95%;
  flex-direction: column;
  @media (min-width: 768px){
    flex-direction: row;
  }
`
const ContainerCheckout = styled.div`
  align-self: flex-start;
  display: flex;
  flex-wrap: wrap;
  margin: 0.8rem auto;
  padding: 0.4rem;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
   @media (min-width: 768px){
     max-width: 30%;
  }
`

const ContainerItemDetails= styled.div`
  background: linear-gradient(0deg, rgba(79,172,238,0.20960259103641454) 28%, rgba(197,233,94,0.14237570028011204) 100%);
  display: block;
  margin: 0.2rem auto;
  width: 95%;
   border-radius: 10px;
   @media (min-width: 768px){
    max-width: 65%;
  }

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
const Button = styled.button`
  color: white;
  background: black;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 0.8rem;
  margin: 0 auto;
  width: 100%;
  @media (min-width: 768px){
    font-size: 1rem;
    padding: 10px;
    width: 50%;
  }`




const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsInCart = useSelector(store => store.cart.items);
  const cartId = readCookie("cartId");
  const userId = readCookie("id");
  const accessToken = readCookie("accessToken");


  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      }
    }

    if (userId && accessToken) {

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

  const deleteBookFromCart = async (productId) => {
  const removeLine = true;
    const removeItemToCartReponse = await removeItemFromCart(productId, userId, removeLine);
  const newCart = removeItemToCartReponse.response;

  if (removeItemToCartReponse.success) {
    dispatch(cart.actions.setCart(newCart));

  } else {
    dispatch(cart.actions.setError(removeItemToCartReponse.response));
    throw new Error('Error adding item to cart')
  }
}


const callKlarnaAPI = async () => {
  const callCheckoutReponse = await createOrderInKlarna(userId);
  dispatch(salesOrder.actions.setCheckoutOrder(callCheckoutReponse.response));
  navigate('/payment');
}
  

    return (
        <React.Fragment>
        <Header/>
        <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
            <ContainerItems>
              <ContainerItemDetails>
              {itemsInCart.length === 0  && "There are no items in this cart"}
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
                </ContainerItemDetails>
              <ContainerCheckout>
                <PrePurchaseSalesOrder />
                <Button onClick={callKlarnaAPI}>Go to Checkout</Button>
              </ContainerCheckout >     
            </ContainerItems>
           <Footer/>
        </React.Fragment>

    );
}

export default Cart;