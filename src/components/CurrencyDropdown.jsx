import React from "react";
import PropTypes from "prop-types";
import { DropdownButton, Dropdown } from "react-bootstrap";

const CurrencyDropdown = props => {
  let items = [];
  props.options.forEach(option => {
    items.push(
      <Dropdown.Item key={option} onClick={() => props.chooseItem(option)}>
        {option}
      </Dropdown.Item>
    );
  });
  return (
    <DropdownButton
      variant="success"
      drop={"down"}
      id="dropdown-basic-button"
      title={props.chosen}
    >
      {items}
    </DropdownButton>
  );
};

CurrencyDropdown.propTypes = {
  chooseItem: PropTypes.func.isRequired,
  chosen: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CurrencyDropdown;
