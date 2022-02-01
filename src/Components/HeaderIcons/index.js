import styled from 'styled-components/macro';
import {Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from "react";


const HeaderBodyContainer = styled.section`
  color: white;
  display: flex;
  justify-content: space-between;
`

const LeftContainer = styled.div`
  display: flex;
`

const RightContainer = styled.div`
  display: flex;
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
  @media (min-width: 768px){
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    font-size: 1.3rem;
  }
`

const HeaderIcons = ({handleOnClickSearch}) => {
  const navigate = useNavigate();
  const cartItems = useSelector(store => store.cart.items);
  const totalItems = cartItems?.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartId = useSelector(store => store.cart._id);

  const handleCart = () => {
    if (cartId){
      navigate('/cart'); 
    }else{
      navigate('/register'); 
    }
  }

    return (
            <HeaderBodyContainer>
                <LeftContainer>
                    <ButtonHeader onClick={handleOnClickSearch}><i className="fas fa-search"></i> search</ButtonHeader>
                </LeftContainer>
                <RightContainer>
          <ButtonHeader><Link to={'/register'} style={{ color: 'white' }} activestyle={{ color: 'red' }}><i className="fas fa-user-circle"></i></Link></ButtonHeader>
          <ButtonHeader><Link to={'/wishlist'} style={{ color: 'white'}} activestyle={{ color: 'red' }}><i className="fas fa-heart"></i></Link></ButtonHeader>
          <ButtonHeader onClick={handleCart}><Link to={'/cart'} style={{ color: 'white', textDecoration: 'none' }} activestyle={{ color: 'red' }}><i className="fas fa-shopping-cart"></i> &nbsp;{totalItems > 0 ? totalItems : "" }</Link></ButtonHeader>
                </RightContainer>
            </HeaderBodyContainer>
    )
}

export default HeaderIcons;