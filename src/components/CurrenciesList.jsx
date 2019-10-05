import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { setFavourite } from "../actions/currencyActions";

class CurrenciesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: {}
    };
  }

  componentDidMount() {
    this.updateCurrencies();
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.base !== this.props.base) |
      (prevProps.favourite !== this.props.favourite)
    ) {
      this.updateCurrencies();
    }
  }

  updateCurrencies() {
    axios
      .get("https://api.exchangeratesapi.io/latest?base=" + this.props.base)
      .then(res => {
        this.setState({
          currencies: res.data.rates
        });
      });
  }

  getRows() {
    let rows = [];
    const currencies = this.state.currencies;
    const favourite = this.props.favourite;
    favourite.forEach(currency => {
      rows.push(this.createTableRow(currency, currencies[currency], true));
    });
    Object.keys(currencies)
      .filter(function(currency) {
        return !favourite.includes(currency);
      })
      .forEach(currency => {
        rows.push(this.createTableRow(currency, currencies[currency], false));
      });

    return rows;
  }

  createTableRow(col1, col2, favourite) {
    let tableRow = (
      <tr key={col1}>
        <td>{col1}</td>
        <td>
          <div className="withStar">
            <div>{col2}</div>
            <div
              className={(favourite ? "colored" : "transparent") + " star"}
              onClick={() => this.toggleRow(col1)}
            >
              <i className="fas fa-star"></i>
            </div>
          </div>
        </td>
      </tr>
    );
    return tableRow;
  }

  toggleRow(currency) {
    let currFavourite = this.props.favourite.slice();
    if (currFavourite.includes(currency)) {
      currFavourite = this.arrayRemove(currFavourite, currency);
    } else {
      currFavourite.push(currency);
    }
    this.props.setFavourite(currFavourite);
  }

  arrayRemove(arr, value) {
    return arr.filter(function(ele) {
      return ele !== value;
    });
  }

  render() {
    let rows = this.getRows();
    return (
      <div className="currList">
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    );
  }
}

CurrenciesList.propTypes = {
  base: PropTypes.string.isRequired,
  favourite: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFavourite: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  base: state.currency.base,
  favourite: state.currency.favourite
});

export default connect(
  mapStateToProps,
  { setFavourite }
)(CurrenciesList);
