import React from "react";
import styled from 'styled-components/macro';

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
  height: 400px;
  margin: 0 auto 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
`

const HeaderMainTitle = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-size: 3.5rem;
  color: white;
  font-weight: 700;
  text-align: center;
  flex-wrap: wrap;
  margin: 1rem;
  @media (min-width: 768px){
    font-size: 4rem;
  }
`

const HorizontalContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 768px){
    flex-direction: row;
    justify-content:space-between;
  }
`

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const UserGreeting = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin: 1rem 1.5rem;
  text-transform: capitalize;
  @media (min-width: 768px){
    font-size: 1.3rem;
  }
`


const Header = () => {
  const userFromCookie = readCookie("username");

    return (
        <HeaderContainer>
          <HeaderMainTitle>Sweden Tech Library</HeaderMainTitle>
          <HorizontalContainer>
            <UserContainer>
              {userFromCookie && <UserGreeting>Hello {userFromCookie}</UserGreeting> }
            </UserContainer>
            <HeaderIcons />
          </HorizontalContainer>
        </HeaderContainer>
    )
}


export default Header;
