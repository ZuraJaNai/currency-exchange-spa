import axios from "axios";
import {
  SET_BASE,
  SET_CURRENCIES,
  SET_FAVOURITE,
  SET_FROM_CUR,
  SET_TO_CUR
} from "../actions/types";

export const initializeCurrencies = () => dispatch => {
  const URL = "https://api.exchangeratesapi.io/latest";
  axios.get(URL).then(res => {
    let currenciesNames = Object.keys(res.data.rates);
    dispatch(setCurrencies(currenciesNames));
  });
  //     .catch(err => {
  //       console.log("errors in initializeCurrencies" + err);
  //     });
};

export const setBase = base => {
  return {
    type: SET_BASE,
    payload: base
  };
};

export const setFavourite = favourite => {
  return {
    type: SET_FAVOURITE,
    payload: favourite
  };
};

export const setFromCurrency = currency => {
  return {
    type: SET_FROM_CUR,
    payload: currency
  };
};

export const setToCurrency = currency => {
  return {
    type: SET_TO_CUR,
    payload: currency
  };
};

const setCurrencies = curr => {
  return {
    type: SET_CURRENCIES,
    payload: curr
  };
};
