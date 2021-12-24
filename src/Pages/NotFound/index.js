import React from 'react';
import styled from 'styled-components/macro';
import Lottie from "react-lottie";
import animationData from "../../lotties/website-error-404-animation.json";
import {useNavigate} from "react-router-dom";

import Button from "../../Components/Button";

const NotFoundContainer = styled.footer`
  width: 80%;
  heigth: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: rgb(247, 251, 225);
  justify-content: center;
  align-items: center;
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
    const navigate = useNavigate();
    function handleClick() {
        navigate("/");
    }
    return (

        <NotFoundContainer>
           <Button onClick={handleClick} buttonText={"Return Home"}></Button>
            <Lottie options={defaultOptions} maxHeight={100} maxWidth={100} />
        </NotFoundContainer>
    );
}

export default NotFound;