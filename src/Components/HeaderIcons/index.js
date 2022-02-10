import React from "react";
import styled from 'styled-components/macro';

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { books } from "../../reducers/books";
import { readCookie } from '../../utils/cookies';


const HeaderBodyContainer = styled.section`
  color: white;
  display: flex;
  justify-content: space-between;
`

const RightContainer = styled.div`
  display: flex;
  margin: 0 1rem;
`

const ButtonHeader = styled.button`
  color: white;
  background: rgb(110, 203, 99);
  border: none;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 0.8rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background: green;
  }
  @media (min-width: 768px){
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    font-size: 1.3rem;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: white;
  &:hover {
    color: black;
  }
`


const HeaderIcons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userIdFromCookies = readCookie("id");
  
  const cartItems = useSelector(store => store.cart.items);
  const totalItemsInCart = cartItems?.reduce((acc, curr) => acc + curr.quantity, 0);
  const wishItems = useSelector(store => store.wishlist.items);
  const totalItemsInWishlist = wishItems?.length;

  const handleCart = () => {
    if (userIdFromCookies){
      navigate('/cart'); 
    }else{
      navigate('/register'); 
    }
  }

  const handleWishlist = () => {
    if (userIdFromCookies) {
      navigate('/wishlist');
    } else {
      navigate('/register');
    }
  }
  const goHome = () => {
    dispatch(books.actions.setBookSearch([]));
    dispatch(books.actions.setError(null));
  }

    return (
            <HeaderBodyContainer>
              <RightContainer>
                <ButtonHeader onClick={goHome}><StyledLink to={'/'}><i className="fas fa-home"></i></StyledLink></ButtonHeader>
                <ButtonHeader><StyledLink to={'/register'} ><i className="fas fa-user-circle"></i></StyledLink></ButtonHeader>
                <ButtonHeader onClick={handleWishlist}><StyledLink to={'/wishlist'} ><i className="fas fa-heart"></i>&nbsp;{totalItemsInWishlist > 0 ? totalItemsInWishlist : ""}</StyledLink></ButtonHeader>
                <ButtonHeader onClick={handleCart}><StyledLink to={'/cart'} ><i className="fas fa-shopping-cart"></i> &nbsp;{totalItemsInCart > 0 ? totalItemsInCart : ""}</StyledLink></ButtonHeader>
              </RightContainer>
            </HeaderBodyContainer>
    )
}

export default HeaderIcons;