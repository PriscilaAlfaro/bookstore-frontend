import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import BookDetails from "./Pages/BookDetails";
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import SignUp from "./Pages/SignIn";
import LogIn from "./Pages/LogIn";


const App= () =>{
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="bookDetails" element={ <BookDetails/>} />
          <Route path="notFound" element={ <NotFound/>} />
          <Route path="cart" element={ <Cart/>} />
          <Route path="wishlist" element={ <Wishlist/>} />
          <Route path="signup" element={ <SignUp/>} />
          <Route path="login" element={ <LogIn/>} />
      </Routes>
  );
}

export default App;
