import React from "react";
import styled from "styled-components";

import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Checkout from "../../Components/Checkout";
import ReturnHome from "../../Components/ReturnHome";


const MainContainer = styled.section`
  background: radial-gradient(circle, rgba(64,62,62,0.7147233893557423) 0%, rgba(190,238,141,0.30575980392156865) 100%);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-radius: 10px;
  width: 80%;
  margin: 2rem auto 4rem auto;
  @media (min-width: 768px){
    width: 70%;
  }
  @media (min-width: 992px) {
    width: 50%;
  }
`

const Payment = () => {
  return (
    <React.Fragment>
      <Header />
      <ReturnHome/>
      <MainContainer>
        <Checkout/>
      </MainContainer>
      <Footer />
    </React.Fragment>
  )
}


export default Payment;
