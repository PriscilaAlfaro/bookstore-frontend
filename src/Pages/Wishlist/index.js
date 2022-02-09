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
  background: linear-gradient(0deg, rgba(148,149,153,0.6404936974789917) 35%, rgba(240,240,232,0.24273459383753504) 89%);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-radius: 10px;
  width: 90%;
  align-content: center;
  margin: 2rem auto 4rem auto;
  @media (min-width: 768px){
    width: 60%;
    flex-direction: row;
  }
`

const ContainerItems = styled.section`
  display: flex;
  margin: 1rem;
  text-align: center;
  box-sizing: border-box;
  flex-wrap: wrap;
  flex-direction: column;
  width: 200px;
`

const ImageContainerLottie = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem auto;
  width: 70%;
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
  color: green;
  cursor: pointer;
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
  padding: 8px;
  margin: 10px auto;
  border-radius: 3px;
  &:hover {
    background-color: green;
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
  width: 170px;
  height: auto;
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
        {itemsInWishlist && itemsInWishlist.length > 0 && itemsInWishlist.map(item => {
          const bookInCart = cartItems?.find(book => book.productId === item.productId);
          return ( 
            <ContainerItems key={item.productId}>
              <Link style={{ textDecoration: 'none' }} to={`/bookDetails/${item.productId}`}><CardImage src={item.url} alt={item.title} /></Link>
              <CardTitle >{item.title}</CardTitle>
              <CartPrice>Price: {item.price} Kr</CartPrice>
              <DeleteButtonFromWishlist onClick={() => handleDeleteBookFromWishlist(item.productId)}>Remove</DeleteButtonFromWishlist>
              <AddToCartButton onClick={() => handleAddToCartFromWishList(item.productId)} style={bookInCart && { backgroundColor: "green" }}>{bookInCart ? " Already in cart" : " Add to cart"}</AddToCartButton>
            </ContainerItems>
          )
          })}


        {itemsInWishlist && itemsInWishlist.length === 0 &&
          <React.Fragment>
            <ContainerItems>
              <OptionalTitle>There are no items in this wishlist</OptionalTitle>
              <ImageContainerLottie>
                <Lottie options={defaultOptions} />
              </ImageContainerLottie>
              <Link to={"/"} style={{ textDecoration: 'none' }}><OptionalText><i className="fas fa-chevron-circle-left"></i> Go to see more books and start adding them!</OptionalText></Link>
            </ContainerItems>
          </React.Fragment>}

        {error &&   
          <React.Fragment>
            <OptionalTitle>There are no items in this wishlist</OptionalTitle>
              <ImageContainerLottie>
                <Lottie options={defaultOptions} />
              </ImageContainerLottie>
              <OptionalText>{error}</OptionalText>
            </React.Fragment>
          }
      </MainContainer>
      <Footer/>
    </React.Fragment>
  );
}

export default Wishlist;
