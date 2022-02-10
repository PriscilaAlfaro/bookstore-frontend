import React, {useEffect} from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import BooksContainer from "../../Components/BooksContainer";
import SearchBar from "../../Components/SearchBar";

import { readCookie } from '../../utils/cookies';
import { cart } from "../../reducers/cart";
import { wishlist } from "../../reducers/wishlist";

import { getWishlistFromDatabase} from "../../managers/wishManager";
import { getCartFromDataBase} from "../../managers/cartManager";

import Lottie from "react-lottie";
import animationData from "../../lotties/books-draw.json";


const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8rem auto;
  width: 100%;
  @media (min-width: 768px){
    width: 50%;
  }
  @media (min-width: 992px) {
    width: 30%;
  }
`

const SearchBarContainer = styled.div`
  width: 100%;
  // margin-top: -1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(0deg, rgba(148,149,153,0.6404936974789917) 32%, rgba(240,240,232,0.24273459383753504) 100%);
`


const Home = () => {
  const booksItems = useSelector(store => store.books.bookItems);
  const booksInSearch = useSelector(store => store.books.searchedItems);

  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
      }
  }

  const dispatch = useDispatch();
  const accessTokenFromCookies = readCookie("accessToken");
  const cartIdFromCookies = readCookie("cartId");
  const userIdFromCookies = readCookie("id");

  useEffect(() => {

    if (accessTokenFromCookies && userIdFromCookies && cartIdFromCookies !== "undefined") {
      getCartFromDataBase(userIdFromCookies).then(data => {
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


    if (userIdFromCookies) {
      getWishlistFromDatabase(userIdFromCookies).then(data => {
        if (data.success) {
          dispatch(wishlist.actions.setWishlist(data.response));
          dispatch(wishlist.actions.setError(null));
        } else {
          dispatch(wishlist.actions.setWishlist([]));
          dispatch(wishlist.actions.setError(data.response));
        }
      }).catch((error) => {
        console.log('Error in Fetch:' + error.message);
      });
    }

  }, [accessTokenFromCookies, cartIdFromCookies, dispatch, userIdFromCookies]);

  return (
    <React.Fragment>
      <Header/>
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>
      {(booksItems.length > 0 || booksInSearch.length > 0)  ?
        <BooksContainer/> :
        <ImageContainer>
          <Lottie options={defaultOptions} />
        </ImageContainer>
      }    
      <Footer/>
    </React.Fragment>
  );
}

export default Home;
