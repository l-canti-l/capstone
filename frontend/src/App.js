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
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import UserList from './pages/userList';
import UserEdit from './pages/UserEdit';

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
          <Route path='/placeOrder' component={PlaceOrder} />
          <Route path='/order/:id' component={Order} />
          <Route path='/admin/userlist' component={UserList} />
          <Route path='/admin/user/:id/edit' component={UserEdit} />
        </Container>
      </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
};

export default App;
