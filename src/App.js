import './App.css';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import BooksContainer from "./Components/BooksContainer";

const App= () =>{
  return (
      <>
        <Header/>
          <BooksContainer/>
          <Footer/>
      </>
  );
}

export default App;
