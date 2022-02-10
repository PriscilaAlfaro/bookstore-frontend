import React, { useEffect } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Counter from "../../Components/Counter";
import PrePurchaseSalesOrder from "../../Components/PrePurchaseSalesOrder";

import { cart } from "../../reducers/cart";
import { salesOrder } from "../../reducers/salesOrder";
import { getCartFromDataBase } from '../../managers/cartManager';

import { createCookie, readCookie, deleteCookie } from "../../utils/cookies";
import { removeItemFromCart } from "../../managers/cartManager";
import { createOrderInKlarna } from "../../managers/checkoutManager";

import Lottie from "react-lottie";
import animationData from "../../lotties/no-search-item-available.json";


const MainContainer= styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
  justify-content: center;
  align-content: center;
  width: 90%;
  flex-direction: column;
  @media (min-width: 768px){
    flex-direction: row;
    margin: 2rem auto;
  }
   @media (min-width: 992px) {
    width: 80%;
  }
`

const ContainerItemDetails = styled.div`
  background: linear-gradient(0deg, rgba(79,172,238,0.20960259103641454) 28%, rgba(197,233,94,0.14237570028011204) 100%);
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 1rem auto;
  min-width: 240px;
  align-self: center;
  justify-content: center;
  border-radius: 10px;
  @media (min-width: 768px){
    width: 90%;
  }
   @media (min-width: 992px) {
    max-width: 55%;
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

const BookDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  @media (min-width: 768px){
    flex-direction: row;
    justify-content: space-around;
    width: 95%;
  }
`

const CardImage= styled.img`
  max-height: 200px;
  min-width: 50px;
  width: 80%;
  margin: 10px 0 10px 2px;
  &:hover {
    filter: brightness(0.80);
  }
  @media (min-width: 768px){
    margin: auto 0.5rem;
  }
}
`

const BookTitle = styled.div`
  margin: auto 10px;
  font-size: 0.9rem;
  max-width: 150px;
  min-width: 80px;
  @media (min-width: 768px){
    width: 300px;
  }
`

const BookPrice= styled.h2`
  font-size: 0.9rem;
  @media (min-width: 768px){
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
  margin: 1rem 0.5rem;
  cursor: pointer;
  &:hover {
    background: red;
  }
  @media (min-width: 768px){
    font-size: 1rem;
    margin-right: 1rem;
    margin-left: 2rem;
    padding: 10px;
  }
`

const GoToCheckoutButton = styled.button`
  color: white;
  background: black;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 0.8rem;
  margin: 0 auto;
  width: 90%;
  cursor: pointer;
  &:hover {
    background: green;
  }
  @media (min-width: 768px){
    font-size: 1rem;
    padding: 10px;
    width: 45%;
  }
`

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem auto;
  @media (min-width: 768px){
    width: 50%;
  }
  @media (min-width: 992px) {
    width: 40%;
  }
`

const OptionalText = styled.h2`
  font-size: 0.7rem;
  margin: 1rem auto;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  color: green;
  @media (min-width: 768px){
    font-size: 1rem;
  }
`

const OptionalTitle = styled.h1`
  font-size: 1rem;
  margin: 1rem auto;
  padding: 2rem;
  text-align: center;
  color: black;
  @media (min-width: 768px){
    font-size: 1rem;
  }
`

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemsInCart = useSelector(store => store.cart.items);
  const error = useSelector(store => store.cart.error);

  const cartIdFromCookies = readCookie("cartId");
  const userIdFromCookies = readCookie("id");
  const accessTokenFromCookies = readCookie("accessToken");


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  useEffect(() => {
    if (userIdFromCookies && accessTokenFromCookies && (cartIdFromCookies !== "" || cartIdFromCookies !== "undefined")) {
      getCartFromDataBase(userIdFromCookies).then(data => {
          if (data.success) {
            dispatch(cart.actions.setCart(data.response));
            dispatch(cart.actions.setError(null));
          } else {
            dispatch(cart.actions.setCart({}));
            dispatch(cart.actions.setError(data.response));
          }
        }).catch((error) => {
          console.log('Error in Fetch:' + error.message);
        });
    }
  }, [accessTokenFromCookies, cartIdFromCookies, dispatch, userIdFromCookies]);


  const deleteBookFromCart = async (productId) => {
    const removeLine = true;
    const removeItemToCartReponse = await removeItemFromCart(productId, userIdFromCookies, removeLine);
    const newCart = removeItemToCartReponse.response;

    if (removeItemToCartReponse.success) {
      dispatch(cart.actions.setCart(newCart));

    } else {
      dispatch(cart.actions.setError(removeItemToCartReponse.response));
      throw new Error('Error adding item to cart')
    }
  }

  const callKlarnaAPI = async () => {
    const callCheckoutReponse = await createOrderInKlarna(userIdFromCookies);
    dispatch(salesOrder.actions.setCheckoutOrder(callCheckoutReponse.response));
    deleteCookie("klarnaOrderId");
    createCookie("klarnaOrderId", callCheckoutReponse.response.order_id);
    navigate('/payment');
  }
  

  return (
      <React.Fragment>
        <Header/>
        <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
        <MainContainer>
          <ContainerItemDetails>

          {itemsInCart && itemsInCart.length > 0 && itemsInCart.map(item => {
            return (
              <BookDetailsContainer key={item.productId}>
                <Link style={{ textDecoration: 'none' }} to={`/bookDetails/${item.productId}`}><CardImage src={item.url} alt={item.title} /></Link>
                <BookTitle>{item.title}</BookTitle>
                <BookPrice>Price: {item.price} Kr</BookPrice>
                <Counter quantity={item.quantity} productId={item.productId} />
                <DeleteButton onClick={() => deleteBookFromCart(item.productId)}><i className="fas fa-trash"></i></DeleteButton>
              </BookDetailsContainer>
            )
          })}

            {itemsInCart && itemsInCart.length === 0  && 
              <React.Fragment>
                <OptionalTitle>There are no items in this cart</OptionalTitle>
                  <ImageContainer>
                    <Lottie options={defaultOptions} />
                  </ImageContainer>
                <Link to={"/"} style={{ textDecoration: 'none' }}><OptionalText> <i className="fas fa-chevron-circle-left"></i> Go Home and start buying!</OptionalText></Link>
              </React.Fragment>}
            
            {error && 
              <React.Fragment>
                <OptionalTitle>There are no items in this cart</OptionalTitle>
                <ImageContainer>
                  <Lottie options={defaultOptions} />
                </ImageContainer>
                <OptionalText>We can't show the cart now</OptionalText>
              </React.Fragment>
            }

          </ContainerItemDetails>
            {itemsInCart && itemsInCart.length > 0 && 
              <ContainerCheckout>
                <PrePurchaseSalesOrder />
                <GoToCheckoutButton onClick={callKlarnaAPI}>Go to Checkout</GoToCheckoutButton>
              </ContainerCheckout> 
            }
        </MainContainer>

        <Footer/>
      </React.Fragment>
  );
}


export default Cart;
