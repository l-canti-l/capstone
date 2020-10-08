import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductInfo from "./pages/ProductInfo";

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={Home} exact />
          <Route path='/product/:id' component={ProductInfo} />
        </Container>
      </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
};

export default App;
