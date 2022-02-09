import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { useNavigate} from "react-router-dom";
import { useDispatch, batch, useSelector } from 'react-redux';

import { cart } from "../../reducers/cart";
import { user } from "../../reducers/user";

import { createCookie } from "../../utils/cookies";
import { addItemToCart } from "../../managers/cartManager";
import { signInUser, createSessionInCookies } from "../../managers/userManager";

import Lottie from "react-lottie";
import animationData from "../../lotties/two-girls-with-books-and-a-skateboard.json";


const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(180deg ,rgb(0 0 0 / 60%) 0%,rgb(68 119 143 / 66%) 95%);
  border-radius: 0 0 10px 10px ;
  width: 90%;
  @media (min-width: 768px){
    width: 50%;
    border-radius: 0 10px 10px 0;
  }
`

const Aside = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  color: white;
  min-height: 450px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(0deg, rgba(207,206,102,0.11948529411764708) 0%, rgba(68,96,143,0.7805497198879552) 95%);
  border-radius: 10px 10px 0 0;
  width: 90%;
  @media (min-width: 768px){
    width: 50%;
    border-radius: 10px 0 0 10px ;
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
  border-radius: 5px;
`

const Button= styled.button`
  margin: 1.5rem;
  background: rgb(67, 111, 138);
  color: azure;
  padding: 5px 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`

const Text= styled.p`
  font-size: 1.3rem;
  color: white;
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


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);
  const temporalItem = useSelector((store) => store.cart.temporalItem);
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

  const onFormSubmit = (event) => {
    event.preventDefault();

    signInUser(email, password).then(data => {
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
          createSessionInCookies({
            id: data.response.id,
            username: data.response.username,
            email: data.response.email,
            accessToken: data.response.accessToken,
          })

          if (temporalItem) {
            addItemToCart(temporalItem, data.response.id).then(addItemToCartReponse => {
              if (addItemToCartReponse.success) {
                createCookie("cartId", addItemToCartReponse._id)
                dispatch(cart.actions.setCart(addItemToCartReponse.response));
              } else {
                dispatch(cart.actions.setError(addItemToCartReponse.response));
                throw new Error('Error adding item to cart')
              }
            });
          }
          
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


  const goToSignUp = () => {
    dispatch(user.actions.showSignIn());
  }

  return (
    <React.Fragment>
      <Aside>
        <Title>Don't have an account? </Title>
        <Button onClick={goToSignUp}>Sing up</Button>
        <ImageContainer>
          <Lottie options={defaultOptions} />
        </ImageContainer>
      </Aside>

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

          <Button block size="lg" type="submit">
              Sign in
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}


export default SignIn;
