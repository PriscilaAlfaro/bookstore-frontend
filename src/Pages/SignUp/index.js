import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { createCookie, deleteCookie } from "../../utils/cookies";
import { createNewUser, createSession } from "../../utils/helper";
import { addItemToCart } from "../../managers/cartManager";

import Lottie from "react-lottie";
import animationData from "../../lotties/bookgirl.json";

import { user } from "../../reducers/user";
import { cart } from "../../reducers/cart";

const Container= styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(180deg ,rgb(0 0 0 / 60%) 0%,rgb(68 119 143 / 66%) 95%);
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
  background: linear-gradient(0deg, rgba(53,131,59,0.3267682072829131) 0%, rgba(68,96,143,0.7805497198879552) 95%);
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
`
const Text= styled.p`
  font-size: 1rem;
  color: white;
  margin: 2rem 0 0.5rem 0;
  @media (min-width: 768px){
    font-size: 1.3rem;
  }
`
const Title= styled.h1`
  font-size: 1rem;
  margin: 2rem;
  text-align: center;
  color: white;
  @media (min-width: 768px){
    font-size: 1.3rem;
  }
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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);
  const cartId = useSelector((store) => store.cart._id);
  const productId = useSelector((store) => store.cart.temporalItem);
  const userId = useSelector((store) => store.user.id);

 const validateForm = () => {
  return email.length > 0 && password.length > 0;
  }


  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      const createUserResponse = await createNewUser(username, email, password);
      const newUser = createUserResponse.response;

      if (createUserResponse.success) {
        createSession(newUser);
        deleteCookie("cartId");
        dispatch(user.actions.setUser(newUser));
      } else {
        dispatch(user.actions.setError(newUser));
        throw new Error('Error creating user')
      }
      
      if(productId) {
        const addItemToCartReponse = await addItemToCart(productId, userId);
        const newCart = addItemToCartReponse.response;

        if (addItemToCartReponse.success) {
          createCookie(cartId, newCart._id)
          dispatch(cart.actions.setCart(newCart));
        } else {
          dispatch(cart.actions.setError(addItemToCartReponse.response));
          throw new Error('Error adding item to cart')
        }
      }
      navigate('/')
    } catch(error) {
      console.error("Error creating account button", error)
    }
  }

  useEffect(() => {
    if (accessToken && cartId) {
        navigate('/')
    }
  }, [accessToken, cartId, dispatch, navigate, productId, userId]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  const goToSingIn = () => {
    dispatch(user.actions.showSignIn());
  }

  return (
    <React.Fragment>
      <Container>

        <Form onSubmit={handleSubmit}>
          <Label htmlFor="username">
            <Text>Username</Text>
            <Input 
              id="username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </Label>

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

          {error && error.keyValue.name && <p className="error">Name {error.keyValue.name} already exists</p>}
          {error && error.keyValue.email && <p className="error">Email {error.keyValue.email} already exists</p>}

          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Sing up
          </Button>
        </Form>
      </Container>
      <Aside>
        <Title>Already have an account?</Title>
        <Button onClick={goToSingIn}>Sign in</Button>
        <ImageContainer>
          <Lottie options={defaultOptions} />
        </ImageContainer>
      </Aside>
    </React.Fragment>
    );
}

export default SignUp;
