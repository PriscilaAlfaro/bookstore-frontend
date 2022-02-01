import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import { createCookie, deleteCookie } from "../../utils/cookies";
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, createCartWithItem, createSession } from "../../utils/helper";

import Lottie from "react-lottie";
import animationData from "../../lotties/bookgirl.json";

import { user } from "../../reducers/user";
import { cart } from "../../reducers/cart";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

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
const Container= styled.section`
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
  font-size: 1rem;
  color: dimgrey;
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

  function validateForm() {
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
        const createCartReponse = await createCartWithItem({ productId, userId: newUser.id });

        const newCart = createCartReponse.response;

        if (createCartReponse.success) {
          createCookie(cartId, newCart._id)
          dispatch(cart.actions.setCart(newCart));
        } else {
          throw new Error('Error creating cart')
        }
      }
      navigate('/')
    } catch(error) {
      console.error("Error creating account button", error)
    }
  }

  useEffect(() => {
    if (accessToken && cartId) {
        navigate('/cart')
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

return (
  <React.Fragment>
    <Header/>
    <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
    <MainContainer>
  
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
      <Link to={"/signin"}><Button>Sign in</Button></Link>
      <ImageContainer>
        <Lottie options={defaultOptions} />
      </ImageContainer>
    </Aside>
    </MainContainer>
    <Footer/>
  </React.Fragment>
    );
}

export default SignUp;
