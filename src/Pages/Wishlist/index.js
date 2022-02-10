import React, { useEffect } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

import { cart } from "../../reducers/cart";
import { wishlist } from "../../reducers/wishlist";

import { readCookie, createCookie} from "../../utils/cookies";
import { getWishlistFromDatabase, removeItemFromWishList } from "../../managers/wishManager";
import { addItemToCart } from "../../managers/cartManager";

import Lottie from "react-lottie";
import animationData from "../../lotties/no-search-item-available.json";


const MainContainer = styled.section`
  background: linear-gradient(0deg,rgba(148,149,153,0.6404936974789917) 35%,rgb(159 237 83 / 24%) 89%);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-radius: 10px;
  width: 90%;
  align-content: center;
  justify-content: center;
  text-align: center;
  align-self: center;
  margin: 2rem auto 4rem auto;
  @media (min-width: 768px){
    flex-direction: row;
  }
`

const ContainerItems = styled.section`
  display: flex;
  margin: 1rem;
  text-align: center;
  justify-content: center;
  box-sizing: border-box;
  flex-wrap: wrap;
`

const BookDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.6rem;
  padding: 10px;
  border-radius: 9px;
  width: 220px;
  background: silver;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`

const ImageContainerLottie = styled.div`
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
  text-align: center;
  color: black;
  @media (min-width: 768px){
    font-size: 1rem;
  }
`

const CardTitle = styled.h1`
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 0.7rem;
  color: black;
  margin: 0 auto;
`

const AddToCartButton = styled.button`
  cursor: pointer;
  font-size: 0.8rem;
  background-color: black;
  border: none;
  color: azure;
  padding: 8px 10px;
  margin: 10px auto;
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
  @media (min-width: 768px){
    font-size: 0.9rem;
  }
`

const DeleteButtonFromWishlist = styled.button`
  color: black;
  background: white;
  border: none;
  border-radius: 5px;
  font-size: 0.5rem;
  padding: 8px;
  margin: 0.5rem auto;
  cursor: pointer;
  &:hover {
    background: red;
  }
  &:active {
    box-shadow: 0 0 8px red;
  }
  @media (min-width: 768px){
    font-size: 0.7rem;
  }
`

const CartPrice = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 0.7rem;
  width: 100%;
  color: black;
  margin: 0 auto;
`

const CardImage = styled.img`
  width: 150px;
  height: 190px;
  &:hover {
    filter: brightness(0.80);
  }
`


const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemsInWishlist = useSelector(store => store.wishlist.items);
  const error = useSelector(store => store.cart.error);
  const cartItems = useSelector(store => store.cart.items);

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
      getWishlistFromDatabase(userIdFromCookies).then(response => {    
        if (response.success) {
          dispatch(wishlist.actions.setWishlist(response.response));
          dispatch(wishlist.actions.setError(null));
        } else {
          dispatch(wishlist.actions.setWishlist([]));
          dispatch(wishlist.actions.setError(response.response));
        }
      });
    }
  }, [accessTokenFromCookies, cartIdFromCookies, dispatch, userIdFromCookies]);

  const handleAddToCartFromWishList = async (productId) => {
    if (accessTokenFromCookies && userIdFromCookies) {
      const addItemToCartReponse = await addItemToCart(productId, userIdFromCookies);
      const newCart = addItemToCartReponse.response;

      if (addItemToCartReponse.success) {
        dispatch(cart.actions.setCart(newCart));
        cartIdFromCookies === "undefined" && createCookie("cartId", newCart._id);

      } else {
        throw new Error('Error adding item to cart')
      }
    } else {
      navigate('/register');
    }

  }

  const handleDeleteBookFromWishlist = async (productId) => {
    const removeItemReponse = await removeItemFromWishList(productId, userIdFromCookies);
    const newWishlist = removeItemReponse.response;

    if (removeItemReponse.success) {
      dispatch(wishlist.actions.setWishlist(newWishlist));
    } else {
      dispatch(wishlist.actions.setError(removeItemReponse.response));
      throw new Error('Error adding item to cart')
    }
  }

  return (
    <React.Fragment>
      <Header />
      <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
      <MainContainer>
        <ContainerItems>
        {itemsInWishlist && itemsInWishlist.length > 0 && itemsInWishlist.map(item => {
          const bookInCart = cartItems?.find(book => book.productId === item.productId);
          return ( 
            <BookDetailsContainer key={item.productId}>
              <Link style={{ textDecoration: 'none' }} to={`/bookDetails/${item.productId}`}><CardImage src={item.url} alt={item.title} /></Link>
              <CardTitle >{item.title}</CardTitle>
              <CartPrice>Price: {item.price} Kr</CartPrice>
              <DeleteButtonFromWishlist onClick={() => handleDeleteBookFromWishlist(item.productId)}>Delete from wishlist</DeleteButtonFromWishlist>
              <AddToCartButton onClick={() => handleAddToCartFromWishList(item.productId)} disabled={bookInCart} style={bookInCart && { backgroundColor: "green" }}>{bookInCart ? "Already in cart" : "Add to cart"}</AddToCartButton>
            </BookDetailsContainer>
          )
          })}


        {itemsInWishlist && itemsInWishlist.length === 0 &&
          <React.Fragment>
  
              <OptionalTitle>There are no items in this wishlist</OptionalTitle>
              <ImageContainerLottie>
                <Lottie options={defaultOptions} />
              </ImageContainerLottie>
              <Link to={"/"} style={{ textDecoration: 'none' }}><OptionalText><i className="fas fa-chevron-circle-left"></i> Go to see more books and start adding them!</OptionalText></Link>
   
          </React.Fragment>}

        {error &&   
          <React.Fragment>
            <OptionalTitle>There are no items in this wishlist</OptionalTitle>
              <ImageContainerLottie>
                <Lottie options={defaultOptions} />
              </ImageContainerLottie>
              <OptionalText>We can't show the wishlist now</OptionalText>
            </React.Fragment>
          }
        </ContainerItems>
      </MainContainer>
      <Footer/>
    </React.Fragment>
  );
}

export default Wishlist;
