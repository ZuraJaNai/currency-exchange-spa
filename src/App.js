import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import Navbar from "./components/Navbar.jsx";
import PageNotFound from "./components/PageNotFound";
import ExchangePage from "./components/ExchangePage";
import CurrenciesPage from "./components/CurrenciesPage";
import { initializeCurrencies } from "./actions/currencyActions";

store.dispatch(initializeCurrencies());

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={ExchangePage} />
            <Route exact path="/currencies" component={CurrenciesPage} />
            <Route path="/*" component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
