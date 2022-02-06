import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import OrderConfirmation from "../../Components/OrderConfirmation";

const MainContainer = styled.section`
  background: silver;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-radius: 10px;
  width: 90%;
  margin: 2rem auto 4rem auto;
  @media (min-width: 768px){
    width: 80%;
  }
  @media (min-width: 992px) {
    width: 60%;
  }
`

const PaymentConfirmation = () => {
  return (
    <React.Fragment>
      <Header />
      <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
      <MainContainer>
        <OrderConfirmation/>
      </MainContainer>
      <Footer />
    </React.Fragment>
  )
}

export default PaymentConfirmation;