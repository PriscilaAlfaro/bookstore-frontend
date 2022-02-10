import React from "react";
import styled from "styled-components";

import { useSelector } from 'react-redux';

import SignUp from "../../Components/SignUp";
import SignIn from "../../Components/SignIn";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Profile from "../../Components/Profile";
import ReturnHome from "../../Components/ReturnHome";

import { readCookie } from "../../utils/cookies";


const MainContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-radius: 10px;
  width: 90%;
  margin: 2rem auto 4rem auto;
  @media (min-width: 768px){
    flex-direction: row;
  }
  @media (min-width: 992px) {
    width: 60%;
  }
`


const Register = () => {
  const showSignIn = useSelector((store) => store.user.showSignIn);

  const userFromCookies = readCookie("username");
  const emailFromCookies = readCookie("email");
  const accessTokenFromCookies = readCookie("accessToken");

  return (
    <React.Fragment>
      <Header />
      <ReturnHome/>
      <MainContainer>
        {userFromCookies && emailFromCookies && accessTokenFromCookies && <Profile />}
        {!showSignIn && !userFromCookies && !emailFromCookies && !accessTokenFromCookies &&  <SignUp /> }
        {showSignIn && !userFromCookies && !emailFromCookies && !accessTokenFromCookies && <SignIn />}
      </MainContainer>
      <Footer />
    </React.Fragment>
  )
}
   
export default Register;
