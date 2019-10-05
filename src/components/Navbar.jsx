import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav id="menu">
        <Link to="/">Converter</Link>
        <Link to="/currencies">Currencies</Link>
      </nav>
    );
  }
}

export default Navbar;
