import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Header from './Header/Header';
import Home from './Pages/Home';
import Products from './Pages/Products'
import ProductMain from './PageProduct/ProductMain'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [addWidthBody, setAddWidthBody] = useState(false);

  return (
    <div id="body-pd" className={addWidthBody ? "bodymain body-pd" : "bodymain"}>
      <Router>
        <Header setAddWidthBody={setAddWidthBody} addWidthBody={addWidthBody} />
        <Navbar addWidthBody={addWidthBody} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" component={() => <ProductMain addWidthBody={addWidthBody} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
