import React from 'react';
import styled from 'styled-components/macro';

import { Link } from "react-router-dom";

import Lottie from "react-lottie";
import animationData from "../../lotties/website-error-404-animation.json";

const NotFoundContainer = styled.footer`
  width: 80%;
  heigth: auto;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    @media (min-width: 768px){
    width: 50%;
  }
  @media (min-width: 992px) {
    width: 30%;
  }
`

const LinkWrapper = styled.footer`
  margin: 2rem auto;
`

const NotFound = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
  }

  return (
    <NotFoundContainer>
      <LinkWrapper>
        <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
      </LinkWrapper>
      <Lottie options={defaultOptions} maxHeight={100} maxWidth={100} />
    </NotFoundContainer>
  );
}

export default NotFound;