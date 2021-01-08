import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Header from './Header/Header';
import ProductMain from './PageProduct/ProductMain';
import UserMain from './PageUser/UserMain';
import Home from './PageHome/Home';
import Orders from './PageOrder/Orders';
import Login from './Login/Login'
import Account from './PageAccount/PageAccount';

function App() {
  const [addWidthBody, setAddWidthBody] = useState(false);

  return (

    // <div id="body-pd" className={addWidthBody ? "bodymain body-pd" : "bodymain"}>
    <Router>

      <Switch>
        <Route path="/" exact component={Login} />
        <div id="body-pd" className={addWidthBody ? "bodymain body-pd" : "bodymain"}>
          <Header setAddWidthBody={setAddWidthBody} addWidthBody={addWidthBody} />
          <Navbar addWidthBody={addWidthBody} />
          <Route path="/home" component={Home} />
          <Route path="/products" component={() => <ProductMain addWidthBody={addWidthBody} />} />
          <Route path="/users" component={() => <UserMain addWidthBody={addWidthBody} />} />
          <Route path="/orders" component={Orders} />
          <Route path="/account" component={Account} />

        </div>
      </Switch>
    </Router>
    // </div >
  );
}

export default App;
