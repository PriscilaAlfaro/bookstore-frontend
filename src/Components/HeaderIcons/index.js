import styled from 'styled-components/macro';
import {Link, useNavigate} from "react-router-dom";
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
  background: rgb(186, 201, 100);
  border: none;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 0.8rem;
  @media (min-width: 768px){
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    font-size: 1.3rem;
  }
`

const HeaderIcons = ({handleOnClickSearch}) => {
    const navigate = useNavigate();

    return (
            <HeaderBodyContainer>
                <LeftContainer>
                    <ButtonHeader onClick={handleOnClickSearch}><i className="fas fa-search"></i> search</ButtonHeader>
                </LeftContainer>
                <RightContainer>
                    <ButtonHeader><Link to={'/signup'}><i className="fas fa-user-circle"></i></Link></ButtonHeader>
                    <ButtonHeader><Link to={'/wishlist'}><i className="fas fa-heart"></i></Link></ButtonHeader>
                    <ButtonHeader ><Link to={'/cart'}><i className="fas fa-shopping-cart"></i>0</Link></ButtonHeader>
                </RightContainer>
            </HeaderBodyContainer>
    )
}

export default HeaderIcons;