import {
  SET_BASE,
  SET_CURRENCIES,
  SET_FAVOURITE,
  SET_FROM_CUR,
  SET_TO_CUR
} from "../actions/types";

const initialState = {
  base: localStorage.getItem("base") || "USD",
  currencies: [],
  favourite: JSON.parse(localStorage.getItem("favourite")) || [],
  from: localStorage.getItem("from") || "USD",
  to: localStorage.getItem("to") || "USD"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BASE:
      localStorage.setItem("base", action.payload);
      return {
        ...state,
        base: action.payload
      };
    case SET_CURRENCIES:
      return {
        ...state,
        currencies: action.payload
      };
    case SET_FAVOURITE:
      localStorage.setItem("favourite", JSON.stringify(action.payload));
      return {
        ...state,
        favourite: action.payload
      };
    case SET_FROM_CUR:
        localStorage.setItem("from", action.payload);
      return {
        ...state,
        from: action.payload
      };
    case SET_TO_CUR:
        localStorage.setItem("to", action.payload);
      return {
        ...state,
        to: action.payload
      };
    default:
      return state;
  }
}
