import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import CurrencyField from "./CurrencyField";
import { setFromCurrency, setToCurrency } from "../actions/currencyActions";

class ExchangePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromNumber: localStorage.getItem("fromNumber") || "",
      toNumber: localStorage.getItem("toNumber") || ""
    };
    this.chooseFrom = this.chooseFrom.bind(this);
    this.chooseTo = this.chooseTo.bind(this);
    this.handleFromInputChange = this.handleFromInputChange.bind(this);
    this.calculateCurrency = this.calculateCurrency.bind(this);
    this.reverseCurrencies = this.reverseCurrencies.bind(this);
  }

  componentDidUpdate() {
    this.calculateCurrency(this.state.fromNumber);
  }
  chooseFrom(item) {
    this.props.setFromCurrency(item);
  }
  chooseTo(item) {
    this.props.setToCurrency(item);
  }

  reverseCurrencies() {
    let from = this.props.from;
    let to = this.props.to;
    this.chooseFrom(to);
    this.chooseTo(from);
  }

  handleFromInputChange(e) {
    const value = e.target.value;
    localStorage.setItem("fromNumber", value);
    this.setState({
      fromNumber: value
    });
    this.calculateCurrency(value);
  }

  async calculateCurrency(baseValue) {
    const res = await axios.get(
      "https://api.exchangeratesapi.io/latest?base=" + this.props.from
    );
    const rate = res.data.rates[this.props.to];
    const value = baseValue * rate;
    localStorage.setItem("toNumber", value);
    this.setState({
      toNumber: value
    });
  }

  render() {
    let options = this.props.currencies;
    return (
      <Container>
        <Row>
          <h2>Currency Exchange</h2>
        </Row>
        <Row>
          <CurrencyField
            label={"From"}
            value={this.state.fromNumber}
            options={options}
            handleInputChange={this.handleFromInputChange}
            placeholder={"Number"}
            chosen={this.props.from}
            chooseItem={this.chooseFrom}
          />
          <div className="reverseIcon" onClick={this.reverseCurrencies}>
            <i className="fas fa-retweet"></i>
          </div>
          <CurrencyField
            label={"To"}
            value={this.state.toNumber}
            options={options}
            placeholder={"Number"}
            chosen={this.props.to}
            chooseItem={this.chooseTo}
          />
        </Row>
      </Container>
    );
  }
}

ExchangePage.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFromCurrency: PropTypes.func.isRequired,
  setToCurrency: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currencies: state.currency.currencies,
  from: state.currency.from,
  to: state.currency.to
});

export default connect(
  mapStateToProps,
  { setFromCurrency, setToCurrency }
)(ExchangePage);
