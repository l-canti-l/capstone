import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductInfo from "./pages/ProductInfo";
import Cart from './pages/Cart';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import PaymentMethod from './pages/PaymentMethod';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={Home} exact />
          <Route path='/product/:id' component={ProductInfo} />
          <Route path='/login' component={Login} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/shipping' component={Shipping} />
          <Route path='/payment' component={PaymentMethod} />
        </Container>
      </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
};

export default App;
