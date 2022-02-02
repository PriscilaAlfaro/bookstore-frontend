import React, {useState} from "react";
// import moment from 'moment';
// import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/macro';
import SearchBar from "../SearchBar";
import HeaderIcons from "../HeaderIcons";
import { readCookie } from "../../utils/cookies";
import LogoutButton from "../LogoutButton";

const HeaderContainer = styled.section`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  background-image: url('/assets/planet.jpeg');
  background-repeat: no-repeat, repeat;
  background-size: cover;
  background-position: center;
  font-family: 'Roboto Condensed', sans-serif;
  width: 100%;
  height: 470px;
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
const UserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const UserGreeting = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin: 1rem;
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
        setShowSearchBar(!showSearchBar)
    }

    return (
        <HeaderContainer>
            <HeaderMainTitle>Sweden Tech Library</HeaderMainTitle>
            <UserContainer>
              {user && <UserGreeting>Hello {user}</UserGreeting> }
              <LogoutButton/>
            </UserContainer>
            <HeaderIcons handleOnClickSearch={handleOnClickSearch}/>
            {showSearchBar && 
            <SearchBarContainer>
                <SearchBar/>
            </SearchBarContainer>}
        </HeaderContainer>
    )
}

export default Header;