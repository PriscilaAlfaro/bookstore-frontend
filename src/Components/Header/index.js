import React, {useState} from "react";
// import moment from 'moment';
// import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/macro';
import SearchBar from "../SearchBar";
import HeaderIcons from "../HeaderIcons";
import { readCookie } from "../../utils/cookies";

const HeaderContainer = styled.section`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  background-image: url('/assets/planet.jpeg');
  background-repeat: no-repeat, repeat;
  background-size: cover;
  background-position: center;
  font-family: 'Roboto Condensed', sans-serif;
  width: 100%;
  height: 450px;
  margin: 0 auto 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const HeaderMainTitle = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-size: 3.5rem;
  color: white;
  font-weight: 700;
  text-align: center;
  @media (min-width: 768px){
    font-size: 4rem;
  }
`

const HelloUser = styled.p`
  font-size: 1rem;
  font-weight: 700;
  text-align: left;
  margin: 0 20px;
  color: white;
  @media (min-width: 768px){
    font-size: 1.3rem;
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

    const handleOnClickSearch = () => {
        console.log(showSearchBar)
        setShowSearchBar(!showSearchBar)
        console.log(showSearchBar)
    }

    return (
        <HeaderContainer>
            <HeaderMainTitle>Sweden Tech Library</HeaderMainTitle>
            <HelloUser>Hello {user}</HelloUser> 
            <HeaderIcons handleOnClickSearch={ handleOnClickSearch}/>
            {showSearchBar && <SearchBarContainer>
                <SearchBar/>
            </SearchBarContainer>}
        </HeaderContainer>
    )
}

export default Header;