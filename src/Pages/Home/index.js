import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import BooksContainer from "../../Components/BooksContainer";
import {Link} from "react-router-dom";
import React from "react";

const Home = () =>{
  
    return (
        <>
            <Header/>
            <BooksContainer/>
            <Footer/>
        </>
    );
}

export default Home;
