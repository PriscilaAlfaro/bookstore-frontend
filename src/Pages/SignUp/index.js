import React, {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";


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

const SignUp= () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


function validateForm() {
return email.length > 0 && password.length > 0;
}

function handleSubmit(event) {
event.preventDefault();
}
return (
    <>
        <Link to={"/"}><i className="fas fa-chevron-circle-left">Return</i></Link>
    <Title>Already have an account?<Link to={"/signin"}><Button>Sign in</Button></Link></Title>
        <Container>
        <Form onSubmit={handleSubmit}>
            <label>
                <Text>Username</Text>
                <Input type="text" />
            </label>
                <Label>
                    <Text>Email</Text>
                    <Input
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Label>

                <Label>
                    <Text>Password</Text>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Label>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
             Sing up
            </Button>
        </Form>
    </Container>
    </>
    );
}

export default SignUp;
