import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import CurrencyDropdown from "./CurrencyDropdown";
import { setBase } from "../actions/currencyActions";

const BaseCurrency = props => {
  const chooseItem = base => {
    props.setBase(base);
  };
  return (
    <Row>
      <div className="currencyField">
        <h2>Base currency</h2>
        <CurrencyDropdown
          chosen={props.base}
          options={props.options}
          chooseItem={chooseItem}
        />
      </div>
    </Row>
  );
};
BaseCurrency.propTypes = {
  base: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  setBase: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  options: state.currency.currencies,
  base: state.currency.base
});

export default connect(
  mapStateToProps,
  { setBase }
)(BaseCurrency);
