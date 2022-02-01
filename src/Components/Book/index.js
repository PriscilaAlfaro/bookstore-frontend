import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cart } from '../../reducers/cart';
import { readCookie, createCookie } from '../../utils/cookies';
import { createCartWithItem } from '../../utils/helper';


const Container= styled.section`
  width: 200px;
  height: auto;
  margin: 1.5rem;
  text-align: center;
  box-sizing: border-box;
`

const ImageContainer= styled.div`
  width: 200px;
  height: auto;
  position: relative;
  cursor: pointer;
`

const CardImage= styled.img`
  width: 100%;
  height: auto;
  z-index: 0;
`

const Overlay= styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.75);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 3;
  box-sizing: border-box;
  ${Container}:hover & {
    display: flex;
  }
`

const Details= styled.p`
  cursor: pointer;
  font-size: 20px;
  filter: invert(1);
  &:hover {
    transform: scale(1.2);
  }
`

const AddToCartButton= styled.button`
  cursor: pointer;
  font-size: 1rem;
  background-color: rgb(67, 111, 138);
  width: 100%;
  height: 30px;
  border: none;
  color: azure;
  margin: 10px auto;
`

const CardTitle = styled.h1`
  // font-family: Rosarivo;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  color: black;
  text-align: left;
  margin: 0;
  @media (min-width: 768px){
    // font-size: 1.2rem;
  }
`

const CardSubTitle = styled.h2`
  // font-family: Rosarivo;
  color: gray;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  text-align: left;
  margin: 0;
  @media (min-width: 768px){
    // font-size: 1.2rem;
  }
`

const BookInfo = styled.h2`
  // font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  width: 100%;
  color: black;
  margin: 0;
  text-align: left;
  @media (min-width: 768px){
    // font-size: 1.2rem;
  }
`

const Book = ({book}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = readCookie("id");
  const cartIdFromCookie = readCookie("cartId");
  const accessToken = readCookie("accessToken");
  const cartId = useSelector(store => store.cart._id);

  const handleAddToCartFromHome = async () => {

    // const fetchCartResponse = await fetchCart(cartIdFromCookie);
    // const cart = fetchCartResponse.response;
    // console.log(cart)
    // dispatch(cart.actions.setCart(cart));

    if (accessToken && userId && cartIdFromCookie ){ //case user and cart
        dispatch(cart.actions.addItemToCart({ productId: book._id }));

    } else if (accessToken && userId && !cartId && !cartIdFromCookie) { //case user and no cart
      const createCartReponse = await createCartWithItem(book._id, userId);
      const newCart = createCartReponse.response;

      if (createCartReponse.success) {
        createCookie("cartId", newCart._id);
        dispatch(cart.actions.setCart(newCart));

      } else {
        throw new Error('Error creating cart')
      }

    } else { // case no user no car

      navigate('/register');
    }
    
  }

  if(book){
    return (
        <Container>
        <Link style={{ textDecoration: 'none' }} to={`/bookDetails/${book._id}`}>
        <ImageContainer>
          <CardImage src={book.thumbnailUrl} alt={book.title}/>
            <Overlay>
              {/* <IconHeart className="fas fa-heart"></IconHeart> */}
            <Details>More details</Details>
            </Overlay>
        </ImageContainer>
        </Link> 
            <AddToCartButton onClick={handleAddToCartFromHome}>Add to cart</AddToCartButton>
            <CardTitle >{book.title}</CardTitle>
            <CardSubTitle>{book.authors.map(author => author)}</CardSubTitle>
            <BookInfo>Price: ${book.price}</BookInfo>
        </Container>
    );
  }
}

export default Book;