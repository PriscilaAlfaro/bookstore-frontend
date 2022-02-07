import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import BooksContainer from "../../Components/BooksContainer";


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

const Wishlist = () => {
    return (
        <React.Fragment>
            <Header/>
            <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
            <MainContainer>
                <BooksContainer/>
            </MainContainer>
            <Footer/>
        </React.Fragment>
    );
}

export default Wishlist;
