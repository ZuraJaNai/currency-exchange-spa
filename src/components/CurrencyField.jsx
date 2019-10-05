import React from "react";
import PropTypes from "prop-types";
import CurrencyDropdown from "./CurrencyDropdown";
import { Form } from "react-bootstrap";

const CurrencyField = props => {
  return (
    <div className="currencyField">
      <Form.Group controlId="formFromCurrency">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          type="text"
          onChange={props.handleInputChange}
          value={props.value}
          placeholder={props.placeholder}
        />
      </Form.Group>
      <CurrencyDropdown
        chosen={props.chosen}
        options={props.options}
        chooseItem={props.chooseItem}
      />
    </div>
  );
};

CurrencyField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleInputChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  chosen: PropTypes.string.isRequired,
  chooseItem: PropTypes.func.isRequired
};

export default CurrencyField;
