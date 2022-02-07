import React, { useEffect } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

import { wishlist } from "../../reducers/wishlist";
import { cart } from "../../reducers/cart";
import { readCookie, createCookie} from "../../utils/cookies";
import { getWishlistFromDatabase, removeItemFromWishList } from "../../managers/wishManager";
import { addItemToCart } from "../../managers/cartManager";

import Lottie from "react-lottie";
import animationData from "../../lotties/no-search-item-available.json";


const MainContainer = styled.section`
  background: linear-gradient(0deg, rgba(148,149,153,0.6404936974789917) 35%, rgba(240,240,232,0.24273459383753504) 89%);
  display: block;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-radius: 10px;
  width: 80%;
  align-content: center;
  margin: 2rem auto 4rem auto;
  @media (min-width: 768px){
    flex-direction: row;
  }
  @media (min-width: 992px) {
    width: 80%;
  }
`

const ContainerItems = styled.section`
  display: flex;
  margin: 1rem;
  width: 170px;
  text-align: center;
  box-sizing: border-box;
  flex-wrap: wrap;
  `

const ContainerItemDetails = styled.div`
  background: linear-gradient(0deg, rgba(79,172,238,0.20960259103641454) 28%, rgba(197,233,94,0.14237570028011204) 100%);
  display: block;
  margin: 1rem auto;
  width: 95%;
  border-radius: 10px;
  @media (min-width: 768px){
    max-width: 65%;
  }
`

const ImageContainerLottie = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem auto;
  width: 60%;
  @media (min-width: 768px){
    width: 50%;
  }
  @media (min-width: 992px) {
    width: 40%;
  }
`
const ErrorText = styled.h2`
  font-size: 0.7rem;
  margin: 1rem auto;
  padding: 2rem;
  text-align: center;
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
  text-align: left;
  margin: 0 auto;
`

const BookInfo = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 0.7rem;
  width: 100%;
  color: black;
  margin: 0 auto;
  text-align: left;
`
const ImageContainer = styled.div`
  width: 200px;
  height: auto;
  position: relative;
`
const CardImage = styled.img`
  width: 170px;
  height: auto;
`

const AddToCartButton = styled.button`
  cursor: pointer;
  font-size: 1rem;
  background-color: rgb(67, 111, 138);
  width: 100%;
  height: 30px;
  border: none;
  color: azure;
  margin: 10px auto;
`
const DeleteButton = styled.button`
  color: white;
  background: #0080008c;
  border: none;
  border-radius: 10px;
  font-size: 0.5rem;
  padding: 8px;
  position: relative;
  bottom: -12%;
  left: 32%;
  cursor: pointer;
  &:hover {
    background: red;
  }
  @media (min-width: 768px){
    font-size: 0.8rem;
    margin-right: 1rem;
    margin-left: 2rem;
    padding: 9px;
  }
`
const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsInWishlist = useSelector(store => store.wishlist.items);
  const cartId = readCookie("cartId");
  const userId = readCookie("id");
  const accessToken = readCookie("accessToken");
  const error = useSelector(store => store.cart.error);
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  useEffect(() => {
    if (userId && accessToken && (cartId !== "" || cartId !== "undefined")) {
      getWishlistFromDatabase(userId).then(response =>{    
        if (response.success) {
          dispatch(wishlist.actions.setWishlits(response.response));
          dispatch(wishlist.actions.setError(null));
        } else {
          dispatch(wishlist.actions.setWishlits([]));
          dispatch(wishlist.actions.setError(response.response));
        }
      });
    }

  }, [accessToken, cartId, dispatch, userId]);

  const handleAddToCartFromWishList = async (productId) => {
    if (accessToken && userId) {
      const addItemToCartReponse = await addItemToCart(productId, userId);
      const newCart = addItemToCartReponse.response;

      if (addItemToCartReponse.success) {
        dispatch(cart.actions.setCart(newCart));
        cartId === "undefined" && createCookie("cartId", newCart._id);

      } else {
        throw new Error('Error adding item to cart')
      }

    } else {
      navigate('/register');
    }

  }

  const handleDeleteBookFromWishlist = async (productId) => {
    const removeItemReponse = await removeItemFromWishList(productId, userId);
    const newWislist = removeItemReponse.response;

    if (removeItemReponse.success) {
      dispatch(wishlist.actions.setWishlits(newWislist));
    } else {
      dispatch(wishlist.actions.setError(removeItemReponse.response));
      throw new Error('Error adding item to cart')
    }
  }

  if (error) {
    return (
      <React.Fragment>
        <Header />
        <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
        <ContainerItemDetails>
          <ErrorText>There are no items in this wishlist</ErrorText>
          <ImageContainerLottie>
            <Lottie options={defaultOptions} />
          </ImageContainerLottie>
          <ErrorText><Link to={"/"}>Go Home and start adding items!</Link></ErrorText>
        </ContainerItemDetails>
        <Footer />
      </React.Fragment>
    )
  }


    return (
        <React.Fragment>
            <Header/>
            <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
              <MainContainer>
                {itemsInWishlist && itemsInWishlist.map(item => {
                  return ( 
                  <ContainerItems>
                    <ImageContainer>
                        <DeleteButton onClick={() => handleDeleteBookFromWishlist(item.productId)}><i className="fas fa-trash"></i></DeleteButton>
                      <CardImage src={item.url} alt={item.title} />
                    </ImageContainer>
                    <CardTitle >{item.title}</CardTitle>
                    <BookInfo>Price: ${item.price}</BookInfo>
                      <AddToCartButton onClick={() => handleAddToCartFromWishList(item.productId)}>Add to cart</AddToCartButton>
                  </ContainerItems>
                  )
                  })}
              </MainContainer>
            <Footer/>
        </React.Fragment>
    );
}

export default Wishlist;
