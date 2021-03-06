import React from "react";
import styled from "styled-components";

import LogoutButton from "../../Components/LogoutButton";

import { readCookie } from "../../utils/cookies";

import Lottie from "react-lottie";
import animationData from "../../lotties/astronaut-read-book.json";


const ProfileMainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 4rem auto;
  width: 90%;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(249,250,245,0.25442051820728295) 0%, rgba(153,150,187,0.5765493697478992) 72%);
  @media (min-width: 768px){
    flex-direction: row;
    width: 80%;
  }
  @media (min-width: 992px) {
    width: 80%;
  }
`

const Title = styled.h1`
  width: 100%;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
  text-align: left;
  margin: 1rem auto;
`

const Text = styled.p`
  width: 100%;
  font-style: normal;
  font-size: 1.2rem;
  color: black;
  text-align: left;
  margin: 1rem auto;
  @media (min-width: 768px){
   font-size: 1.4rem;
  }
`

const SpecialText = styled.p`
  width: 100%;
  font-style: italic;
  font-size: 1rem;
  color: black;
  text-align: left;
  margin: 1rem auto;
`

const TextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
  width: 70%;
  @media (min-width: 768px){
    width: 60%;
  }
  @media (min-width: 992px) {
    width: 40%;
  }
`

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 4rem auto;
  width: 70%;
  @media (min-width: 768px){
    width: 60%;
  }
  @media (min-width: 992px) {
    width: 40%;
  }
`


const Profile = () => {
  const userFromCookies = readCookie("username");
  const emailFromCookies = readCookie("email");
  const cartIdFromCookie = readCookie("cartId");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
  }

  return (
    <ProfileMainContainer>
      <TextContainer>
        <Title>Your profile</Title>
        <Text>Username: {userFromCookies}</Text>
        <Text>Email: {emailFromCookies}</Text>
        {cartIdFromCookie && <SpecialText>You have an active cart</SpecialText>}
      </TextContainer>
      <ImageContainer>
        <Lottie options={defaultOptions} />
      </ImageContainer>
      <LogoutButton/>
    </ProfileMainContainer>
  );
}


export default Profile;
