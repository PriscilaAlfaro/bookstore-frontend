import React, {useState} from "react";
// import moment from 'moment';
// import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/macro';
import SearchBar from "../SearchBar";

const HeaderContainer = styled.section`
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    color: white;   
    background: rgb(67, 111, 138);
    font-family: 'Roboto Condensed', sans-serif;
    width: 100%;
    margin: 0 auto 2rem auto;
`

const HeaderBodyContainer = styled.section`
    color: white;
    border-radius: 2px;
    margin: 0px auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`

const LeftContainer = styled.div`
  padding: 0 1rem;
  align-self: center;
    `

const RightContainer = styled.div`
    padding: 0 1rem;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-self: self-end;
    `

const ButtonHeader = styled.button`
    color: white;
    background: rgb(186, 201, 100);
    border: none;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 0.8rem;
    @media (min-width: 768px){
       font-size: 1.1rem;
    }
    @media (min-width: 992px) {
        font-size: 1.3rem;
    }
    `

const HeaderMainTitle = styled.h1`
    font-size: 1.7rem;
    font-weight: 700;
    margin: 0 auto;
    text-align: center;
    padding: 1rem 0 0.2rem 0;
    @media (min-width: 768px){
       font-size: 2.2rem;
    }
    @media (min-width: 992px) {
        font-size: 2.5rem;
    }
    `

const SearchBarContainer = styled.div`
    width: 100%;
    margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: darkgray;
    `

const Header = () => {
    const [showSearchBar, setShowSearchBar]=  useState(false);
    // const dispatch = useDispatch();
    // const date = useSelector(store => store.todo.today)
    // const tasks = useSelector(store => store.todo.tasks)
    //
    // const handleOnClickClear = () => {
    //     dispatch(todo.actions.clearAllTasks())
    // }

    const handleOnClickSearch = () => {
        console.log(showSearchBar)
        setShowSearchBar(!showSearchBar)
        console.log(showSearchBar)
    }


    return (
        <HeaderContainer>
            <HeaderMainTitle>PAS Books</HeaderMainTitle>
            <HeaderBodyContainer>
                <LeftContainer>

                </LeftContainer>
                <RightContainer>
                    <ButtonHeader onClick={handleOnClickSearch}><i className="fas fa-search"></i> search</ButtonHeader>
                    <ButtonHeader ><i className="fas fa-user-circle"></i> my account</ButtonHeader>
                    <ButtonHeader ><i className="fas fa-shopping-cart"></i> $0</ButtonHeader>
                    <ButtonHeader ><i className="fas fa-heart"></i> wishlist</ButtonHeader>
                </RightContainer>
            </HeaderBodyContainer>
            {/*<HeaderSubTitle>{moment(new Date()).format('dddd')}, {moment(new Date()).format('ll')}</HeaderSubTitle>*/}
            {showSearchBar && <SearchBarContainer>
                <SearchBar/>
            </SearchBarContainer>}
        </HeaderContainer>
    )
}

export default Header;