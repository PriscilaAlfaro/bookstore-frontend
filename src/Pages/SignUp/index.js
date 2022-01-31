import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../utils/url";
import { createCookie, deleteCookie } from "../../utils/cookies";
import { useDispatch, batch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { user } from "../../reducers/user";
import { cart } from "../../reducers/cart";
import { createNewUser, createCartWithItem, createSession } from "../../utils/helper";

const Container= styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  background: silver;
  border-radius: 10px;
  width: 80%;
  @media (min-width: 768px){
    width: 60%;
  }
  @media (min-width: 992px) {
    width: 40%;
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



return (
  <React.Fragment>
    <Link to={"/"}><i className="fas fa-chevron-circle-left">Return</i></Link>
    <Title>Already have an account?<Link to={"/signin"}><Button>Sign in</Button></Link></Title>
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
  </React.Fragment>
    );
}

export default SignUp;
