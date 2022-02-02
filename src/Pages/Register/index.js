import React from "react";
import { readCookie } from "../../utils/cookies";
import Profile from "../../Components/Profile"
import styled from "styled-components";

import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";


import SignUp from "../SignUp";
import SignIn from "../SignIn";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

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
    const user = readCookie("username");
    const email = readCookie("email");
    const accessToken = readCookie("accessToken");
    const showSignIn = useSelector((store) => store.user.showSignIn);

return (
    <React.Fragment>
        <Header />
        <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
        <MainContainer>
            {user && email && accessToken && <Profile />}
            {!user && !email && !accessToken && showSignIn ? <SignIn /> : <SignUp />  }
        </MainContainer>
        <Footer />
    </React.Fragment>
)
}
   

export default Register;
