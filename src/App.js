import React from 'react';

import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import Order from './Components/Order/Order';
import Manage from './Components/Manage/Manage';
import NotFound from './Components/NotFound/NotFound';
import ProductDetail from './Components/ProductDetail/ProductDetail';


function App() {
  return(
    <div>

      <Header></Header>
      
      <Router>
        <Switch>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route exact path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/order">
            <Order></Order>
          </Route>
          <Route path="/manage">
            <Manage></Manage>
          </Route>
          <Route path="/product/:prodKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  )
  
}
export default App;
