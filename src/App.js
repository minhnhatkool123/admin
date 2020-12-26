import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Header from './Header/Header';
import ProductMain from './PageProduct/ProductMain';
import Home from './Pages/Home';

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
