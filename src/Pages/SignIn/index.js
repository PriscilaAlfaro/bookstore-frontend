import React, {useState, useEffect} from "react";
import styled from "styled-components";

import {Link, useNavigate} from "react-router-dom";
import { useDispatch, batch, useSelector } from 'react-redux';

import { API_URL } from "../../utils/url";
import { user } from "../../reducers/user";
import { createCookie } from "../../utils/cookies";

import Lottie from "react-lottie";
import animationData from "../../lotties/bookgirl.json";

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

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  background: silver;
  border-radius: 10px 10px 0 0;
  width: 90%;
  @media (min-width: 768px){
    width: 50%;
    border-radius: 10px 0 0 10px ;
  }
`

const Aside = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  min-height: 450px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: green;
  border-radius: 0 0 10px 10px ;
  width: 90%;
  @media (min-width: 768px){
    width: 50%;
    border-radius: 0 10px 10px 0;
  }
 
`

const Form= styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;
`

const Label= styled.label`
  width: 100%;
`

const Input= styled.input`
  width: 100%;
  background-color: rgb(247, 251, 225);
  height: 1.7rem;
  border: none;
`

const Button= styled.button`
  margin: 1.5rem;
  background: rgb(67, 111, 138);
  color: azure;
  padding: 5px 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
`

const Text= styled.p`
  font-size: 1.3rem;
  color: dimgrey;
  margin: 2rem 0 0.5rem 0;
`

const Title= styled.h1`
  font-size: 1.3rem;
  margin: 2rem;
  text-align: center;
`
const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 50%;
  @media (min-width: 768px){
    width: 40%;
  }
  @media (min-width: 992px) {
    width: 30%;
  }
`

const SignIn= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/'); 
    }
  }, [accessToken, navigate]);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }

    fetch(API_URL('users/signin'), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUser({
              id: data.response.id,
              username: data.response.username,
              email: data.response.email,
              accessToken: data.response.accessToken,
            }));
            dispatch(user.actions.setError(null));
          });
          createCookie("accessToken", data.response.accessToken)
        } else {
          dispatch(user.actions.setUser({
            id: null,
            username: null,
            email: null,
            accessToken: null,
          }));
          dispatch(user.actions.setError(data.response));
        }
      })
  }

  return (
    <React.Fragment>
      <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
    <MainContainer>
     
      <Container>
        <Form onSubmit={onFormSubmit}>
          <Label htmlFor="email">
            <Text>Email</Text>
            <Input
              autoFocus
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Label>

          <Label htmlFor="passsword">
            <Text>Password</Text>
            <Input
              id="passsword"
              type="password"
              value={password}
              minlength="5"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>

          {error && <p className="error">{error}</p>}

          <Button block size="lg" type="submit" disabled={!validateForm()}>
              Log in
          </Button>
        </Form>
      </Container>
        <Aside>
          <Title>Don't have an account? </Title> 
          <Link to={"/signup"}><Button>Sing up</Button></Link>
          <ImageContainer>
            <Lottie options={defaultOptions} />
          </ImageContainer>
        </Aside>
      </MainContainer>

    </React.Fragment>
  );
}

export default SignIn;
