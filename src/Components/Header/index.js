import React, {useState} from "react";
// import moment from 'moment';
// import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/macro';
import SearchBar from "../SearchBar";
import HeaderIcons from "../HeaderIcons";
import { readCookie } from "../../utils/cookies";

const HeaderContainer = styled.section`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  background: rgb(67, 111, 138);
  font-family: 'Roboto Condensed', sans-serif;
  width: 100%;
  height: 350px;
  margin: 0 auto 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const HeaderMainTitle = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  @media (min-width: 768px){
    font-size: 4rem;
  }
  @media (min-width: 992px) {
    //font-size: 4.5rem;
  }
`

const SearchBarContainer = styled.div`
  width: 100%;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: darkgray;
`

const Header = () => {
    const [showSearchBar, setShowSearchBar]=  useState(false);

  const user = readCookie("username");
  const email = readCookie("email");
  const accessToken = readCookie("accessToken");
  const cartIdFromCookie = readCookie("cartId");


    const handleOnClickSearch = () => {
        console.log(showSearchBar)
        setShowSearchBar(!showSearchBar)
        console.log(showSearchBar)
    }

    return (
        <HeaderContainer>
            <HeaderMainTitle>Sweden Tech Library</HeaderMainTitle>
        Hello {user} |  email: {email} | cartId: {cartIdFromCookie} | aToken: {accessToken}
            <HeaderIcons handleOnClickSearch={ handleOnClickSearch}/>
            {showSearchBar && <SearchBarContainer>
                <SearchBar/>
            </SearchBarContainer>}
        </HeaderContainer>
    )
}

export default Header;